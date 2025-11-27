import {css, Global} from '@emotion/react'

export function GlobalStyles() {
    return (
        <Global
            styles={css`
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body {
                font-family: system-ui, sans-serif;
                background-color: #f5f5f5;
              }

              a {
                text-decoration: none;
                color: inherit;
              }

              ul, ol {
                list-style: none;
              }
            `}
        />
    )
}