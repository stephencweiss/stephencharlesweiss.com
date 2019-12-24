import { css } from 'styled-components'
import theme from 'styled-theming'

const whiteish = `#F6F7EB`
const solarized = `#fdf6e3`
const highlighted = `#feb`
const blackish = `#090314`
const reddish = `rgba(255, 109, 91, 0.99)`

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
}
`,
  dark: css`
    background-color: ${blackish};
    color: ${whiteish};
    * + ::selection {
      background: ${reddish} none;
      text-shadow: none;
      color: ${blackish};
    }

    .gatsby-code-title {
      background-color: ${reddish};
      color: ${blackish};
    }
  `,
})
