import {action, makeObservable, observable, runInAction} from "mobx";

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
        makeObservable(this, {
            isLoggedIn: observable,
            signIn: action,
            me: action,
            signOut: action
        })
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

    me = async () => {
        try {
            const token = localStorage.getItem("authToken")

            if (!token) {
                runInAction(() => {
                    this.isLoggedIn = false
                })
                return
            }

            const response = await fetch('https://dummyjson.com/auth/me', {

                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },

            })
            runInAction(() => {
                if (response.ok) {
                    this.isLoggedIn = true
                } else {
                    this.isLoggedIn = false;
                    localStorage.removeItem("authToken")
                }
            })
        } catch (error) {
            runInAction(() => {
                this.isLoggedIn = false
            })
        }
    }

    signOut = () => {
        localStorage.removeItem("authToken")
        runInAction(() => {
            this.isLoggedIn = false
        })
    }
}

export default new SignInStore()