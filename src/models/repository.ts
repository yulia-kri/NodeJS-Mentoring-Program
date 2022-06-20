import { Model, ModelStatic, Transaction } from 'sequelize';

import { IRepository } from './interfaces';

export abstract class Repository<M extends Model, T> implements IRepository<M, T> {
    protected constructor(private model: ModelStatic<M>) {}

    public async findOne(id: string, transaction?: { transaction: Transaction }) {
        return await this.model.findByPk(id, transaction);
    }

    public async create(item: T) {
        return await this.model.create(item);
    }

    public abstract update(id: string, updatedFields: Partial<T>): Promise<M>;

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
