import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useParams, useRouter} from "@tanstack/react-router";
import {Button} from '../../../shared/ui/Button/Button';
import UserStore from "../../../stores/user.store";
import SignInStore from "../../../stores/signIn.store";
import {OwnPosts} from "../../posts/components/OwnPost";
import * as S from "../styles/User";

export const User = observer(() => {
    const {user} = UserStore;
    const {currentUser} = SignInStore;
    const {userId} = useParams({from: '/users/$userId/'});
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            const id = parseInt(userId);
            UserStore.currentUser(id);
        }
    }, [userId]);

    const handleEdit = () => {
        return router.navigate({to: '/users/$userId/edit/'});
    };

    const handleShowUsers = () => {
        return router.navigate({to: '/users/'});
    };

    const isOwnProfile = currentUser?.id && user?.id && currentUser.id === user.id;

    return (
        <S.UserContainer>
            <S.UserCard>
                <S.UserHeader>
                    <S.UserImage
                        src={user?.image || S.DEFAULT_AVATAR}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        onError={(e) => {
                            e.currentTarget.src = S.DEFAULT_AVATAR;
                        }}
                    />
                    <S.UserInfo>
                        <S.UserName>
                            {user?.firstName} {user?.lastName}
                        </S.UserName>
                    </S.UserInfo>
                </S.UserHeader>

                <S.UserDetails>
                    <S.DetailItem>
                        <S.DetailLabel>First Name:</S.DetailLabel>
                        <S.DetailValue>{user?.firstName}</S.DetailValue>
                    </S.DetailItem>
                    <S.DetailItem>
                        <S.DetailLabel>Last Name:</S.DetailLabel>
                        <S.DetailValue>{user?.lastName}</S.DetailValue>
                    </S.DetailItem>
                    <S.DetailItem>
                        <S.DetailLabel>Address:</S.DetailLabel>
                        <S.DetailValue>{user?.address.address}</S.DetailValue>
                    </S.DetailItem>
                    <S.DetailItem>
                        <S.DetailLabel>Email:</S.DetailLabel>
                        <S.DetailValue>{user?.email}</S.DetailValue>
                    </S.DetailItem>
                    <S.DetailItem>
                        <S.DetailLabel>Phone:</S.DetailLabel>
                        <S.DetailValue>{user?.phone}</S.DetailValue>
                    </S.DetailItem>
                </S.UserDetails>

                {isOwnProfile && (
                    <S.ButtonsContainer>
                        <Button
                            title="Edit Profile"
                            onClick={handleEdit}
                        />
                        <Button
                            title="Show Users List"
                            onClick={handleShowUsers}
                        />
                    </S.ButtonsContainer>
                )}
            </S.UserCard>

            {isOwnProfile && user?.id && (
                <OwnPosts
                    userId={user.id}
                    isOwnProfile={isOwnProfile}
                />
            )}
        </S.UserContainer>
    );
});
