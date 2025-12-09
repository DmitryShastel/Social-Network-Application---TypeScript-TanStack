import styled from '@emotion/styled';

export const EditContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

export const EditCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0 0 2rem 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #667eea;
  font-size: 0.95rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

interface MessageProps {
    type: 'success' | 'error';
}

export const Message = styled.div<MessageProps>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
  background: ${props => props.type === 'success'
          ? 'rgba(72, 187, 120, 0.1)'
          : 'rgba(245, 101, 101, 0.1)'};
  color: ${props => props.type === 'success'
          ? '#2e7d32'
          : '#d32f2f'};
  border: 1px solid ${props => props.type === 'success'
          ? 'rgba(72, 187, 120, 0.3)'
          : 'rgba(245, 101, 101, 0.3)'};
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  backdrop-filter: blur(2px);
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 3rem;
`;

export const AddressRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AddressInput = styled(Input)`
  flex: 1;
`;