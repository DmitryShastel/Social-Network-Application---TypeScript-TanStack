import {css} from '@emotion/react';

export const signUpStyles = {
    container: css`
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    `,

    formContainer: css`
      background: white;
      padding: 2.5rem;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    `,

    title: css`
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
      font-size: 1.8rem;
      font-weight: 600;
    `,

    form: css`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    `,

    fieldGroup: css`
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    `,

    label: css`
      font-weight: 500;
      color: #374151;
      font-size: 0.9rem;
    `,

    input: css`
      padding: 0.75rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: white;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      &::placeholder {
        color: #9ca3af;
      }
    `,

    inputError: css`
      border-color: #ef4444;

      &:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    `,

    errorText: css`
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `,

    serverError: css`
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      text-align: center;
    `,

    button: css`
      background: #667eea;
      color: white;
      border: none;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 0.5rem;

      &:hover:not(:disabled) {
        background: #5a6fd8;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }
    `,

    buttonDisabled: css`
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    `,

    linksContainer: css`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1rem;
      text-align: center;
    `,

    link: css`
      color: #667eea;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;

      &:hover {
        color: #5a6fd8;
        text-decoration: underline;
      }
    `,

    passwordRequirements: css`
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 0.25rem;

      ul {
        margin: 0.25rem 0;
        padding-left: 1rem;
      }

      li {
        margin: 0.125rem 0;
      }
    `
};