import { css } from 'styled-components'
import theme from 'styled-theming'

const whiteish = `#F6F7EB`
const solarized = `#FDF6E3`
const solarHighlighted = `#FEB`
const blackish = `#090314`
const reddish = `rgba(255, 109, 91, 0.99)`

const base03 = '#002b36'
const base02 = '#073642'
const base01 = '#586e75'
const base00 = '#657b83'
// const base0 = '#839496'
const base1 = '#93a1a1'
const base2 = '#eee8d5'
const base3 = solarized;
const yellow = '#b58900'
const brightYellow = '#F9EE98'
const orange = '#cb4b16'
// const red = '#dc322f'
// const magenta = '#d33682'
const violet = '#6c71c4'
const blue = '#268bd2'
const cyan = '#2aa198'
const green = '#859900'

export default theme('mode', {
  light: css`
    background-color: ${whiteish};
    color: ${blackish};
    * + ::selection {
      background: ${reddish} none;
      text-shadow: none;
      color: ${whiteish};
    }

    .gatsby-code-title {
        background-color: ${reddish};
        color: ${blackish};
    }

    pre code[class*='language-'],
    pre[class*='language-'] {
        color: ${base00};
    }

    :not(pre) > code[class*='language-'] {
        background-color: ${reddish};
        color: ${whiteish};
    }


    pre[class*='language-']::selection,
    code[class*='language-']::selection,
    pre[class*='language-']::-moz-selection,
    code[class*='language-']::-moz-selection {
        background: ${base02};
    }



    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: ${base1};
    }

    .token.punctuation {
        color: ${base01};
    }

    .namespace {
        opacity: 0.7;
    }

    .token.property,
    .token.tag,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: ${blue};
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.url,
    .token.inserted {
        color: ${cyan};
    }

    .token.entity {
        color: ${base00};
        background: ${base2};
    }

    .token.atrule,
    .token.attr-value,
    .token.keyword {
        color: ${green};
    }

    .token.function,
    .token.class-name {
        color: ${yellow};
    }

    .token.regex,
    .token.important,
    .token.variable {
        color: ${orange};
    }

    .gatsby-highlight-code-line {
        background-color: ${solarHighlighted};
        border-left: 0.25em solid #f99;
    }

    .gatsby-highlight {
        background-color: ${solarized};
    }

    .command-line-prompt > span:before {
        color: #999;
    }
  }
  `,
  dark: css`
    background-color: ${blackish};
    color: ${whiteish};

    button {
        color: ${whiteish};
        background-color: ${blackish};
    }

    * + ::selection {
      background: ${reddish} none;
      text-shadow: none;
      color: ${blackish};
    }

    .gatsby-code-title {
      background-color: ${reddish};
      color: ${blackish};
    }

    :not(pre) > code[class*='language-'] {
        background-color: ${reddish};
        color: ${blackish};
    }

    pre[class*='language-']::selection,
    code[class*='language-']::selection,
    pre[class*='language-']::-moz-selection,
    code[class*='language-']::-moz-selection {
        text-shadow: none;
        background: ${base02}; /* HUH? */
    }

    /* Code blocks */
    pre[class*='language-'] {
        border-radius: 0.5em;
        background: ${base03};
        // border: 0.3em solid ${base02};
        // box-shadow: 1px 1px 0.5em ${base02} inset;
        border-radius: 0em;
    }

    /* Inline */
    :not(pre) > code[class*='language-'] {
        background: ${base03};
        // border: 0.13em solid ${base02};
        // box-shadow: 1px 1px 0.3em -0.1em ${base02} inset;
      }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: ${base2};
    }

    .token.punctuation {
        opacity: 0.7;
    }

    .token.tag,
    .token.boolean,
    .token.number,
    .token.deleted {
        color: ${blue};
    }

    .token.keyword,
    .token.property,
    .token.selector,
    .token.constant,
    .token.symbol,
    .token.builtin {
        color: ${brightYellow};
    }

    .token.attr-name,
    .token.attr-value,
    .token.string,
    .token.char,
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string,
    .token.variable,
    .token.inserted {
        color: ${green};
    }

    .token.atrule {
        color: #7587A6;
    }

    .token.regex,
    .token.important {
        color: #E9C062;
    }

    pre[data-line] {
        padding: 1em 0 1em 3em;
        position: relative;
    }

    /* Markup */
    .language-markup .token.tag,
    .language-markup .token.attr-name,
    .language-markup .token.punctuation {
        color: #AC885B;
    }

    /* Make the tokens sit above the line highlight so the colours don't look faded. */
    .token {
        position: relative;
        z-index: 1;
    }

    .line-highlight {
        background: hsla(0, 0%, 33%, 0.25); /* #545454 */
        background: linear-gradient(
            to right,
            hsla(0, 0%, 33%, 0.1) 70%,
            hsla(0, 0%, 33%, 0)
        ); /* #545454 */
        border-bottom: 1px dashed hsl(0, 0%, 33%); /* #545454 */
        border-top: 1px dashed hsl(0, 0%, 33%); /* #545454 */
        left: 0;
        line-height: inherit;
        margin-top: 0.75em; /* Same as .prism’s padding-top */
        padding: inherit 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        white-space: pre;
        z-index: 0;
    }

    .line-highlight:before,
    .line-highlight[data-end]:after {
        background-color: hsl(215, 15%, 59%); /*  */
        border-radius: 999px;
        box-shadow: 0 1px white;
        color: hsl(24, 20%, 95%); /* #F5F2F0 */
        content: attr(data-start);
        font: bold 65%/1.5 sans-serif;
        left: 0.6em;
        min-width: 1em;
        padding: 0 0.5em;
        position: absolute;
        text-align: center;
        text-shadow: none;
        top: 0.4em;
        vertical-align: 0.3em;
    }

    .line-highlight[data-end]:after {
        bottom: 0.4em;
        content: attr(data-end);
        top: auto;
    }

    .gatsby-highlight {
        background-color: ${base03};
    }


  `,
})
