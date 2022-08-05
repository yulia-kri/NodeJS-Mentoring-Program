const { v4: uuid } = require('uuid');
const { Sequelize } = require('sequelize');

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'groups',
            [
                {
                    id: uuid(),
                    name: 'read_only',
                    permissions: Sequelize.literal('ARRAY[\'READ\']::"enum_groups_permissions"[]'),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name: 'read_and_write',
                    permissions: Sequelize.literal("ARRAY['READ','WRITE']::\"enum_groups_permissions\"[]"),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name: 'share',
                    permissions: Sequelize.literal('ARRAY[\'SHARE\']::"enum_groups_permissions"[]'),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name: 'delete',
                    permissions: Sequelize.literal('ARRAY[\'DELETE\']::"enum_groups_permissions"[]'),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    name: 'full_access',
                    permissions: Sequelize.literal(
                        "ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::\"enum_groups_permissions\"[]",
                    ),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('groups', null, {});
    },
};
