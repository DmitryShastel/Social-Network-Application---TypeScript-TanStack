import styled from '@emotion/styled';
import {keyframes} from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const PostCard = styled.article`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  min-height: 200px;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 180px;
  }
`;

export const PostContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PostTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const PostBody = styled.p`
  color: rgba(255, 255, 255, 0.8);
  flex-grow: 1;
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    -webkit-line-clamp: 3;
  }
`;

export const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: white;
  min-height: 200px;
`;

export const EndMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-style: italic;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin: 2rem 0;
`;
