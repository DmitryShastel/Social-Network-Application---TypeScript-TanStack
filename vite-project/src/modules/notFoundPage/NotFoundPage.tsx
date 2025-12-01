import styled from "@emotion/styled";
import {useRouter} from "@tanstack/react-router";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  line-height: 1;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  background: ${props => props.variant === 'primary' ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.variant === 'primary' ? '#667eea' : 'white'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    background: ${props => props.variant === 'primary' ? '#f8f9fa' : 'rgba(255, 255, 255, 0.2)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Illustration = styled.div`
  width: 300px;
  height: 200px;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: "404";
    position: absolute;
    font-size: 12rem;
    font-weight: 900;
    opacity: 0.1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
      font-size: 8rem;
    }
  }
`;

export const NotFoundPage = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.navigate({to: '/'});
    };

    const handleGoBack = () => {
        router.history.back();
    };

    return (
        <NotFoundContainer>
            <Illustration/>

            <ErrorCode>404</ErrorCode>
            <ErrorTitle>This page not found</ErrorTitle>

            <ErrorMessage>
                Unfortunately, the page you are looking for does not exist, it has been moved.
                or temporarily unavailable.
            </ErrorMessage>

            <ButtonGroup>
                <Button onClick={handleGoBack} variant="secondary">
                    Back
                </Button>

                <Button onClick={handleGoHome} variant="primary">
                    Home
                </Button>
            </ButtonGroup>
        </NotFoundContainer>
    );
};