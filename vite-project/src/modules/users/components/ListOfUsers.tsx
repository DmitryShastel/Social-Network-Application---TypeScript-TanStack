import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import {UserWithPosts} from "./UserWithPosts";
import UserStore from "../../../stores/user.store";
import {observer} from "mobx-react-lite";


const UsersList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: white;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadMoreButton = styled.button`
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem auto;
  display: block;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EndMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
`;


export const ListOfUsers = observer(() => {
    const {allUsers, isLoading} = UserStore;

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

    if (isLoading && !users.length) {
        return (
            <LoadingContainer>
                <Spinner/>
                <p>Loading users...</p>
            </LoadingContainer>
        );
    }

    return (
        <>
            <div style={{color: 'white', textAlign: 'center', marginBottom: '1rem'}}>
                <p>Showing {loadedCount} of {totalUsers} users</p>
            </div>

            <UsersList>
                {users.map((user) => (
                    <UserWithPosts key={user.id} user={user}/>
                ))}
            </UsersList>

            {hasNextPage && (
                <LoadMoreButton
                    onClick={handleLoadMore}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading more...' : 'Load More Users'}
                </LoadMoreButton>
            )}

            {!hasNextPage && loadedCount > 0 && (
                <EndMessage>
                    <p>No more users to load</p>
                </EndMessage>
            )}

            {!isLoading && loadedCount === 0 && (
                <EndMessage>
                    <p>No users found</p>
                </EndMessage>
            )}
        </>
    );
});
