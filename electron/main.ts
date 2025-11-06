import { generateMedicationTimes } from '@/lib/utils'
import { Item } from '@/types/item'
import { parse } from 'date-fns'
import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { alarmsFileManger, settingsFileManger } from './file-manager'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let isQuitting = false
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.removeMenu()
  win.webContents.on("context-menu", () => {
    if (process.env.NODE_ENV === "development") {
      win?.webContents.openDevTools()
    }
  })
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
  win.on("minimize", (e) => {
    e.preventDefault();
    win?.hide()
  })
  win.on("close", (e) => {
    if (!isQuitting) {
      e.preventDefault()
      win?.hide()
    }
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

function createTray() {
  const tray = new Tray(path.join(process.env.VITE_PUBLIC, "logo.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        win?.show();
        window.focus()
      }
    },
    {
      label: 'Exit', click: function () {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
  tray.setContextMenu(contextMenu)

  tray.on("click", () => {
    win?.show()
    win?.focus()
  })
}

ipcMain.handle("alarm:create", async (_event, alarm) => {
  return alarmsFileManger.create(alarm, (item) => ({
    id: 0,
    times: generateMedicationTimes(Number(item.frequency), parse(item?.startingTime || "00:00", "HH:mm", new Date())),
    ...item,
  }) as Item)
})
ipcMain.handle("alarm:getAll", async () => {
  return alarmsFileManger.readAll()
})
ipcMain.handle("alarm:getById", async (_event, id) => {
  return alarmsFileManger.readById(id)
})
ipcMain.handle("alarm:update", async (_event, id, alarm) => {
  return alarmsFileManger.update(id, alarm)
})
ipcMain.handle("alarm:delete", async (_event, id) => {
  return alarmsFileManger.delete(id)
})

ipcMain.handle("settings:get", async () => {
  return settingsFileManger.readAll()[0]
})

ipcMain.handle("settings:save", async (_event, settings) => {
  const existing = settingsFileManger.readAll()

  if (existing.length > 0) {
    return settingsFileManger.update(existing[0].id!, settings)
  }

  return settingsFileManger.create(settings)
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
  createTray()
})
