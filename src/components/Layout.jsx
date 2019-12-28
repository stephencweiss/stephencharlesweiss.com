import React, { useState } from 'react'
import { Header } from '../components/Headers'
import styled, { ThemeProvider } from 'styled-components'
import useDarkMode from 'use-dark-mode'

import theme from '../theme'

const Paper = styled.div`
  ${theme}
`
const Wrapper = styled.div`
  max-width: 40em;
  margin: auto;
`

function Layout(props) {
  const darkMode = useDarkMode(false)
  const mode = darkMode.value ? 'dark-mode': 'light-mode';
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  console.log(`Layout --> `, {darkMode})
  return (
    <ThemeProvider theme={{ mode }}>
      <Paper>
        <Wrapper>
          <Header
            darkMode={darkMode}
            title={title}
            root={location.pathname === rootPath}
          />
          {/* <button onClick={handleClick}>{mode}</button> */}
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with ❤️ using
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Wrapper>
      </Paper>
    </ThemeProvider>
  )
}

export default Layout
