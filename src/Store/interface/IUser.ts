export interface ILoginResponse {
    refreshToken: string
    accesToken: string
}

export interface IUser{
    name: string,
    email: string,
    password: string
}

export interface IResponse{
    body: string
    status: number
    statusText: string
    type: string
}