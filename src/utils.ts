import { User } from './models';

export const getAutoSuggestUsers = ({
    limit,
    loginSubstring,
    users,
}: {
    limit: string;
    loginSubstring: string;
    users: User[];
}) => {
    return users
        .filter(({ isDeleted }) => !isDeleted)
        .filter(({ login }) => login.toLowerCase().includes(loginSubstring.toLowerCase()))
        .slice(0, +limit);
};
