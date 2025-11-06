import { generateMedicationTimes } from "../src/lib/utils";
import { AlarmSchedule } from "../src/lib/zod/alarm-schedule";
import { parse } from "date-fns";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class FileManger {
    private filePath: string;
    private static instance: FileManger

    constructor(fileName: string) {
        this.filePath = path.join(__dirname, '..', 'src', 'assets', fileName);
        this.initializeFile();
    }

    public static getInstance() {
        if (!FileManger.instance) {
            FileManger.instance = new FileManger("alarms.json")
        }
        return FileManger.instance
    }

    private initializeFile(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }

    create(item: AlarmSchedule): Item {
        const data = this.readAll();
        const newItem: Item = {
            ...item,
            times: generateMedicationTimes(parseInt(item.frequency), parse(item.startingTime, "HH:mm", new Date())),
            id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1
        };
        data.push(newItem);
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        return newItem;
    }

    readAll(): Item[] {
        const content = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(content);
    }

    readById(id: number): Item | null {
        return this.readAll().find((item) => item.id === id) || null;
    }

    update(id: number, updates: Partial<Item>): Item | null {
        const data = this.readAll().map((item) => item.id === id ? ({ ...item, ...updates }) : item)[0];
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        return data;
    }

    delete(id: number): boolean {
        const data = this.readAll();
        const filtered = data.filter((item) => item.id !== id);
        if (filtered.length === data.length) return false;
        fs.writeFileSync(this.filePath, JSON.stringify(filtered, null, 2));
        return true;
    }
}

export const fileManger = FileManger.getInstance()