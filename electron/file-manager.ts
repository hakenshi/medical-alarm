import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Item } from "../src/types/item";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

class FileManger<T extends { id?: number }> {
    private filePath: string;

    constructor(fileName: string) {
        this.filePath = path.join(__dirname, '..', 'src', 'assets', fileName);
        this.initializeFile();
    }

    private initializeFile(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    }

    private generateId(data: T[]): number {
        return data.length > 0 ? Math.max(...data.map(d => d.id || 0)) + 1 : 1
    }

    create(item: Partial<T>, transform?: (item: Partial<T>) => T): T {
        const data = this.readAll();
        const newItem: T = (transform ? transform(item) : { id: this.generateId(data), ...item } as T);

        if (!newItem.id) {
            newItem.id = this.generateId(data)
        }

        data.push(newItem);
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        return newItem;
    }
    readAll(): T[] {
        const content = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(content);
    }

    readById(id: number): T | null {
        return this.readAll().find((item) => item.id === id) || null;
    }

    update(id: number, updates: Partial<T>): T | null {
        const data = this.readAll();
        const updatedItem = data.find(i => i.id === id)
        if (!updatedItem) return null

        Object.assign(updatedItem, updates)

        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        return updatedItem;
    }

    delete(id: number): boolean {
        const data = this.readAll();
        const filtered = data.filter((item) => item.id !== id);
        if (filtered.length === data.length) return false;
        fs.writeFileSync(this.filePath, JSON.stringify(filtered, null, 2));
        return true;
    }
}

export const alarmsFileManger = new FileManger<Item>("alarms.json")
export const settingsFileManger = new FileManger<Settings>("settings.json")