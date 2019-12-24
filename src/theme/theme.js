import { css } from 'styled-components'
import theme from 'styled-theming'

const whiteish = `#F6F7EB`
const blackish = '#090314'

export default theme('mode', {
  light: css`
    background-color: ${whiteish};
    color: ${blackish};
    * + ::selection {
      background: rgba(255, 109, 91, 0.99) none;
      text-shadow: none;
      color: ${whiteish};
    }
  `,
  dark: css`
    background-color: ${blackish};
    color: ${whiteish};
    * + ::selection {
      background: rgba(255, 109, 91, 0.99) none;
      text-shadow: none;
      color: ${blackish};
    }
  `,
})
