export enum ROLES {
    USER = 0,
    MODERATOR = 1,
    ADMIN = 2,
}

export type User = {
    id: number
    name: string | null
    email: string | null
    login: string
    createdAt: number
    roleId: ROLES
}
