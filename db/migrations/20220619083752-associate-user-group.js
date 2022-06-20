const { DataTypes } = require('sequelize');
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('user_groups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            group_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'groups',
                    key: 'id',
                },
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user_groups');
    },
};
