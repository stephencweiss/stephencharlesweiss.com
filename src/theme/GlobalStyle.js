import { createGlobalStyle } from 'styled-components'
import gray from 'gray-percentage'

const GlobalStyle = createGlobalStyle`
    header {
        font-family: "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    body,
    button,
    input,
    textarea {
        font-family:  "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    html {
        box-sizing: border-box;
    }

    body {
        font-size: 1rem;
        line-height: 1.25em;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    a {
        color: #4078C0;
        text-decoration: none;
      }

    a:hover,
    a:active {
        text-decoration: underline;
    }

    h1 {
        border-bottom: 1px solid ${gray(93)};
        padding-bottom: 0.5rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: 600;
        line-height: 2.5rem;
    }

    h2 {
        border-bottom: 1px solid ${gray(93)};
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 2.5rem;
    }

    h3, h4, h5, h6 {
        margin-top: 1.5rem;
        margin-bottom: 0.25rem;
    }

    blockquote {
        border-left: 4px solid ${gray(87)};
        color: ${gray(47)};
        margin-top: 0;
        margin-right: 0;
        margin-left: 0;
        padding-left: calc(20/2 - 1)px;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

`

export default GlobalStyle
