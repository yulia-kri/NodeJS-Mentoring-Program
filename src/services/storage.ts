import { Model } from 'sequelize';
import { ModelStatic } from 'sequelize/types/model';

export class ItemsStorage<T extends { id: string; isDeleted: boolean }> {
    // eslint-disable-next-line no-unused-vars
    constructor(private items: ModelStatic<Model>) {}

    public async getAllItems() {
        return await this.items.findAll();
    }

    public async addItem(item: T) {
        const newItem = await this.items.create(item);
        // @ts-ignore
        return newItem.id;
    }

    public async updateItem(updatedItem: Partial<T> & { id: string }) {
        const [num] = await this.items.update(updatedItem, { where: { id: updatedItem.id } });
        if (num) {
            return 'User was updated successfully.';
        }
        throw new Error('Item not found.');
    }

    public async deleteItem(id: string) {
        const num = await this.items.destroy({ where: { id } });

        if (num === 1) {
            return 'User was deleted successfully!';
        }
        throw new Error('Item not found.');
    }
}
