import {User, UserFormData, UsersResponse} from "../modules/users/types/user";
import {makeObservable, observable, runInAction} from "mobx";
import {Post, PostsResponse} from "../modules/posts/types/post";

class UserStore {
    user: User | null = null
    allUsers: UsersResponse | null = null
    isLoading: boolean = false
    allPosts: Array<{ userId: number, posts: Post[] }> = []

    constructor() {
        makeObservable(this, {
            user: observable,
            allUsers: observable,
            allPosts: observable,
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

    getUsersList = async (skip: number = 0, limit: number = 5) => {
        try {
            runInAction(() => {
                this.isLoading = true;
            })
            const token = localStorage.getItem("authToken");

            const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const userListData: UsersResponse = await response.json()
                runInAction(() => {
                    if (skip === 0) {
                        this.allUsers = userListData;
                    } else {
                        const currentUsers = this.allUsers?.users || [];
                        this.allUsers = {
                            users: [...currentUsers, ...userListData.users],
                            total: userListData.total,
                            skip: skip,
                            limit: limit
                        };
                    }
                    this.isLoading = false;
                });
            }

        } catch (error) {
            return 'Failed to fetch posts'
        }
    }

    getUsersPosts = async (userId: number) => {
        try {
            const token = localStorage.getItem("authToken")
            const response = await fetch(`https://dummyjson.com/users/${userId}/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const postsData: PostsResponse = await response.json()
                runInAction(() => {
                    this.allPosts = this.allPosts.filter(post => post.userId !== userId)
                    this.allPosts.push({
                        userId: userId,
                        posts: postsData.posts
                    });
                })
                return postsData.posts;
            } else {
                runInAction(() => {
                    this.allPosts = this.allPosts.filter(item => item.userId !== userId);
                    this.allPosts.push({
                        userId: userId,
                        posts: []
                    });
                });
            }
        } catch (error) {
        }
    }

    getPostByUserId = (userId: number): Post[] => {
        const userPosts = this.allPosts.find(item => item.userId === userId);
        return userPosts ? userPosts.posts : [];
    }

}

export default new UserStore()