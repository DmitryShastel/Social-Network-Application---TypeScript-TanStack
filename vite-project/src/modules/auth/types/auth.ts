export interface SignIn {
    username: string
    password: string
}

export interface SignInResponse {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    accessToken: string
    refreshToken: string
}