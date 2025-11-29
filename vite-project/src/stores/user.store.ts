import {User} from "../modules/users/types/user";
import {makeObservable, observable, runInAction} from "mobx";

class UserStore {
    user: User | null = null
    allUsers: boolean = false

    constructor() {
        makeObservable(this, {
            user: observable,
        })
    }

    currentUser = async (id: number) => {
        try {
            const token = localStorage.getItem("authToken")
            const response = await fetch(`https://dummyjson.com/users/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const userData: User = await response.json()
                console.log(userData)
                runInAction(() => {
                    this.user = userData
                })
            } else {
                runInAction(() => {
                    this.user = null;
                });
            }
        } catch (error) {
        }
    }

}

export default new UserStore()