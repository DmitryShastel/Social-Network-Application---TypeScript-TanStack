import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {UserWithPosts} from "./UserWithPosts";
import UserStore from "../../../stores/user.store";
import * as S from "../styles/ListOfUsers";
import {Button} from "../../../shared/ui/Button/Button";
import {useLocation, useRouter} from "@tanstack/react-router";

export const ListOfUsers = observer(() => {
    const {allUsers, isLoading} = UserStore;
    const router = useRouter();
    const location = useLocation();
    const fromUserId = location.state?.fromUserId as number | undefined;

    useEffect(() => {
        if (!allUsers || allUsers.users.length === 0) {
            UserStore.getUsersList(0);
        }
    }, [allUsers]);

    const users = allUsers?.users || [];
    const totalUsers = allUsers?.total || 0;
    const loadedCount = users.length;
    const hasNextPage = loadedCount < totalUsers;

    const handleLoadMore = () => {
        if (hasNextPage && !isLoading) {
            UserStore.getUsersList(loadedCount);
        }
    };

    const handelBack = () => {
        if (fromUserId) {
            router.navigate({
                to: '/users/$userId',
                params: {userId: fromUserId.toString()},
                state: undefined
            });
        } else {
            router.navigate({to: '/'});
        }
    };

    if (isLoading && !users.length) {
        return (
            <S.LoadingContainer>
                <S.Spinner/>
                <p>Loading users...</p>
            </S.LoadingContainer>
        );
    }

    return (
        <>
            <Button title={'Back'} onClick={handelBack}/>
            <S.UsersCount>
                <p>Showing {loadedCount} of {totalUsers} users</p>
            </S.UsersCount>

            <S.UsersList>
                {users.map((user) => (
                    <UserWithPosts key={user.id} user={user}/>
                ))}
            </S.UsersList>

            {hasNextPage && (
                <S.LoadMoreButton
                    onClick={handleLoadMore}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading more...' : 'Load More Users'}
                </S.LoadMoreButton>
            )}

            {!hasNextPage && loadedCount > 0 && (
                <S.EndMessage>
                    <p>No more users to load</p>
                </S.EndMessage>
            )}

            {!isLoading && loadedCount === 0 && (
                <S.EndMessage>
                    <p>No users found</p>
                </S.EndMessage>
            )}
        </>
    );
});
