import React from 'react'
import { GlobalStyle } from '../theme'

export default ({ element }) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      {element}
    </React.Fragment>
  )
}
