import { v4 as uuid } from 'uuid';

export class ItemsStorage<T extends { id: string; isDeleted: boolean }> {
    private items: T[] = [];

    public get allItems(): T[] {
        return this.items;
    }

    public addItem(item: T): T {
        const newItem = { ...item, id: this.generateId(), isDeleted: false };
        this.items.push(newItem);
        return newItem;
    }

    private generateId(): string {
        const id = uuid();
        if (this.findById(id)) {
            this.generateId();
        }
        return id;
    }

    public findById(itemId: string): T | undefined {
        return this.items.find(({ id }) => id === itemId);
    }

    public updateItem(updatedItem: Partial<T> & { id: string }): T {
        const { id } = updatedItem;
        const item = this.findById(id);
        if (item) {
            const index = this.findIndex(id);
            this.items[index] = { ...item, ...updatedItem };
            return this.items[index];
        }
        throw new Error('Item not found.');
    }

    public deleteItem(itemId: string): T {
        const item = this.findById(itemId);
        if (item) {
            if (!item.isDeleted) {
                const index = this.findIndex(itemId);
                this.items[index] = { ...item, isDeleted: true };
                return this.items[index];
            }
            throw new Error('Item has been already deleted.');
        } else {
            throw new Error('Item not found.');
        }
    }

    private findIndex(itemId: string): number {
        return this.items.findIndex(({ id }) => id === itemId);
    }
}
