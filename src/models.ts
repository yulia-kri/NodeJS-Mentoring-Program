export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

export enum HttpCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
}
