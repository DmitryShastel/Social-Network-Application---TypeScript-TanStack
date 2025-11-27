import {css} from "@emotion/react";

export const homeStyles = {
    container: css`
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    `,

    header: css`
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      position: sticky;
      top: 0;
      z-index: 100;
    `,

    headerContent: css`
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,

    logo: css`
      font-size: 1.8rem;
      font-weight: bold;
      background: linear-gradient(45deg, #667eea, #764ba2);
      background-clip: inherit;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    `,

    nav: css`
      display: flex;
      gap: 1rem;
    `,

    button: css`
      padding: 0.75rem 1.5rem;
      border: 2px solid #667eea;
      background: transparent;
      color: #667eea;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
    `,

    signUpButton: css`
      background: #667eea;
      color: white;

      &:hover {
        background: #5a6fd8;
        border-color: #5a6fd8;
      }
    `,

    main: css`
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    `,

    title: css`
      text-align: center;
      color: white;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    `,

    postsGrid: css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    `,

    postCard: css`
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 1.5rem;
      min-height: 200px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
      }
    `,

    postContent: css`
      height: 100%;
      display: flex;
      flex-direction: column;
    `,

    postTitle: css`
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `,

    postBody: css`
      color: rgba(255, 255, 255, 0.8);
      flex-grow: 1;
      margin: 0 0 1rem 0;
      line-height: 1.5;
    `,

    postMeta: css`
      display: flex;
      justify-content: space-between;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      margin-top: auto;
    `,

    loading: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      color: white;
    `,

    spinner: css`
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
    `,

    endMessage: css`
      text-align: center;
      padding: 2rem;
      color: rgba(255, 255, 255, 0.8);
      font-style: italic;
    `,

    error: css`
      text-align: center;
      padding: 2rem;
      color: white;

      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      p {
        color: rgba(255, 255, 255, 0.8);
      }
    `
}