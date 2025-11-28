import {makeObservable, runInAction} from "mobx";

interface SignIn {
    username: string
    password: string
}

interface SignInResponse {
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

class SignInStore {

    isLoggedIn: boolean = false

    constructor() {
        makeObservable(this)
    }

    signIn = async (email: string, password: string) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            })
            const data = await response.json()
            
            if (response.ok && data.accessToken) {
                runInAction(() => {
                    localStorage.setItem("authToken", data.accessToken)
                    this.isLoggedIn = true
                })
                return true;
            } else {
                return false
            }

        } catch (error) {
        }
    }

}

export default new SignInStore()