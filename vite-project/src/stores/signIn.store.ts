import {action, makeObservable, observable, runInAction} from "mobx";


class SignInStore {

    isLoggedIn: boolean = false
    currentUser: { id: number } | null = null

    constructor() {
        makeObservable(this, {
            isLoggedIn: observable,
            currentUser: observable,
            signIn: action,
            me: action,
            signOut: action
        })
        this.me();
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
                    this.currentUser = {
                        id: data.id
                    }
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
                    this.currentUser = null
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