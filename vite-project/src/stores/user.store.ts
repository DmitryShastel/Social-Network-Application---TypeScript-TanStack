import {User, UserFormData, UsersResponse} from "../modules/users/types/user";
import {makeObservable, observable, runInAction} from "mobx";

class UserStore {
    user: User | null = null
    allUsers: UsersResponse | null = null
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

    usersPosts = async (userId: number) => {
        try {
            runInAction(() => {
                this.isLoading = true;
            })
            const token = localStorage.getItem("authToken");
            const limit: number = 5
            const pageParam: number = 0
            const skip = pageParam + limit

            const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const userData: UsersResponse = await response.json()
                runInAction(() => {
                    this.allUsers = userData
                    this.isLoading = false
                })
            }

        } catch (error) {
            return 'Failed to fetch posts'
        }
    }

}

export default new UserStore()