import { Model, ModelStatic, Transaction } from 'sequelize';

import { IRepository } from './interfaces';

export abstract class Repository<M extends Model, T> implements IRepository<M, T> {
    protected constructor(private model: ModelStatic<M>) {}

    public async findById(id: string, transaction?: { transaction: Transaction }) {
        return await this.model.findByPk(id, transaction);
    }

    public async findOne(field: string, value: string = '') {
        return await this.model.findOne({ where: { [field]: value } });
    }

    public async create(item: T) {
        return await this.model.create(item);
    }

    public async update(id: string, updatedFields: Partial<T>) {
        const [_, item] = await this.model.update(updatedFields, { where: { id }, returning: true, plain: true });
        return Array.isArray(item) ? item[0] : item;
    }

    public async delete(id: string) {
        try {
            await this.model.destroy({ where: { id } });
            return 'Item was deleted.';
        } catch (e) {
            throw new Error('Item not found.');
        }
    }

    public async find() {
        return await this.model.findAll();
    }
}
