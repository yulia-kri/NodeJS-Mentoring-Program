import { Sequelize, DataTypes } from 'sequelize';

export default async (sequelize: Sequelize) => {
    const User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    await User.sync();

    return User;
};
