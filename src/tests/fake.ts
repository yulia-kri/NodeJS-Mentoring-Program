const common = {
    created_at: new Date(),
    updated_at: new Date(),
};

export const fakeUsers = [
    {
        id: '8d74f23d-dcbe-4551-8e99-16d4d7638d4c',
        login: 'test_user_1',
        password: '123qwe',
        age: 33,
        ...common,
    },
    {
        id: 'ccf1c637-3e56-46d4-8c35-267583863f51',
        login: 'test_user_2',
        password: 'abc0',
        age: 33,
        ...common,
    },
    {
        id: '3cb67aad-09e0-447c-8b86-0bdbeb8a7eaf',
        login: 'test_user_3',
        password: 'asd789',
        age: 33,
        ...common,
    },
];

export const fakeGroups = [
    {
        id: 'd466ea14-6d37-4215-9f26-cd6ac6127cdf',
        name: 'read_only',
        permissions: ['READ'],
        ...common,
    },
    {
        id: '57ecb04d-3179-4f88-9140-44f5cd639a39',
        name: 'full_access',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
        ...common,
    },
];
