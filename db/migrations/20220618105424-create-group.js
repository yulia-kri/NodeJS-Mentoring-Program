const { DataTypes } = require('sequelize');
module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_groups_permissions"');

        await queryInterface.createTable('groups', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('groups');
    },
};
