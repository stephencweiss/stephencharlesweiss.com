import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body,
    button,
    input,
    textarea {
        font-family: helvetica;
    }

    html {
        box-sizing: border-box;
        font-size: 14px;
        background-color: #F6F7EB;
    }

    body {
        font-size: 1rem;
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

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

`

export default GlobalStyle
