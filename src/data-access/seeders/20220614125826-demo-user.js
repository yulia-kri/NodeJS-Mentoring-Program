const { v4: uuid } = require('uuid');
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: uuid(),
                    login: 'user1',
                    password: 'user1',
                    age: 21,
                    is_deleted: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    login: 'user2',
                    password: 'user2',
                    age: 22,
                    is_deleted: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    login: 'user3',
                    password: 'user3',
                    age: 23,
                    is_deleted: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    login: 'user4',
                    password: 'user4',
                    age: 24,
                    is_deleted: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuid(),
                    login: 'user5',
                    password: 'user5',
                    age: 25,
                    is_deleted: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
