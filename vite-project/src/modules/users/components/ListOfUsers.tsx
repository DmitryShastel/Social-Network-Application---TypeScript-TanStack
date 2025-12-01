import React from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import styled from '@emotion/styled';
import {UserWithPosts} from "./UserWithPosts";
import {UsersResponse} from "../types/user";


const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

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


// Функции для запросов
const fetchUsers = async ({pageParam = 0}): Promise<UsersResponse> => {
    const limit = 5;
    const skip = pageParam * limit;

    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export const ListOfUsers = () => {
    // Infinite query для пользователей
    //@ts-ignore
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, pages) => {
            const totalFetched = pages.reduce((total, page) => total + page.users.length, 0);
            return totalFetched < lastPage.total ? pages.length : undefined;
        },
        initialPageParam: 0,
    });

    // Получаем всех пользователей из всех страниц
    const allUsers = data?.pages.flatMap(page => page.users) || [];

    // Обработка ошибок
    if (error) {
        return (
            <Container>
                <Title>Users List</Title>
                <div style={{textAlign: 'center', color: 'white', padding: '2rem'}}>
                    <h3>Error loading users</h3>
                    <p>{error.message}</p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Users List</Title>

            {isLoading ? (
                <LoadingContainer>
                    <Spinner/>
                    <p>Loading users...</p>
                </LoadingContainer>
            ) : (
                <>
                    <UsersList>
                        {allUsers.map((user) => (
                            <UserWithPosts key={user.id} user={user}/>
                        ))}
                    </UsersList>

                    {hasNextPage && (
                        <LoadMoreButton
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? 'Loading more...' : 'Load More Users'}
                        </LoadMoreButton>
                    )}

                    {!hasNextPage && allUsers.length > 0 && (
                        <EndMessage>
                            <p>No more users to load</p>
                        </EndMessage>
                    )}

                    {!isLoading && allUsers.length === 0 && (
                        <EndMessage>
                            <p>No users found</p>
                        </EndMessage>
                    )}
                </>
            )}
        </Container>
    );
};
