import { BrowserRouter, Route, Routes } from "react-router"
import Alarms from "./components/alarms"
import Home from "./components/home"
import Layout from "./components/layout"
import { Settings } from "./components/settings/index.tsx"
import { SettingsProvider } from "./components/providers/settings-provider.tsx"

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes >
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/alarms' element={<Alarms />} />
            <Route path='/configurations' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
