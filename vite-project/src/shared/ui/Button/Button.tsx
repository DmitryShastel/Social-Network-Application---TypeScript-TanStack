import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}

const StyledButton = styled.button<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #667eea;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  background-color: white;
  color: #667eea;

  &:hover:not(:disabled) {
    background-color: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active:not(:disabled) {
    background-color: #5a6fd8;
    border-color: #5a6fd8;
    transform: translateY(0);
  }
`;

export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onClick,
                                                  disabled = false,
                                              }) => {
    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    };

    return (
        <StyledButton
            onClick={handleClick}
            disabled={disabled}
        >
            {title}
        </StyledButton>
    );
};