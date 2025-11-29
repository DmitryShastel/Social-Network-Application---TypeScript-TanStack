import {User} from "../modules/users/types/user";
import {makeObservable, runInAction} from "mobx";

class UserStore {
    user: User | null
    allUsers: boolean = false

    constructor() {
        makeObservable(this, {})
    }

    currentUser = async (id: number) => {
        try {
            const token = localStorage.getItem("authToken")
            const responce = await fetch(`https://dummyjson.com/users/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if (responce.ok) {
                const userData: User = await responce.json()
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