import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

export const FormContainer = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
`;

interface InputProps {
    hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  padding: 0.75rem 1rem;
  border: 2px solid ${({hasError}) => (hasError ? '#ef4444' : '#e5e7eb')};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({hasError}) => (hasError ? '#ef4444' : '#667eea')};
    box-shadow: ${({hasError}) =>
            hasError
                    ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                    : '0 0 0 3px rgba(102, 126, 234, 0.1)'};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background: #5a6fd8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    transform: none !important;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  text-align: center;
`;

export const Link = styled.a`
  color: #667eea;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: #5a6fd8;
    text-decoration: underline;
  }
`;