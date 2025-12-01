import {User, UserFormData} from "../modules/users/types/user";
import {makeObservable, observable, runInAction} from "mobx";

class UserStore {
    user: User | null = null
    allUsers: boolean = false
    isLoading: boolean = false

    constructor() {
        makeObservable(this, {
            user: observable,
            isLoading: observable
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

    updateUser = async (userId: number, formData: UserFormData) => {
        try {
            runInAction(() => {
                this.isLoading = true;
            })
            const token = localStorage.getItem("authToken");
            const response = await fetch(`https://dummyjson.com/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                runInAction(() => {
                    this.user = updatedUser
                    this.isLoading = false
                })
                return {success: true, data: updatedUser}
            }
        } catch (error) {
            return {success: false, error: 'Network error', isLoading: false}
        }
    }

}

export default new UserStore()