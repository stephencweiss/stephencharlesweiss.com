import React, { useState } from 'react'
import { Header } from '../components/Headers'
import styled, { ThemeProvider } from 'styled-components'

import theme  from "../theme"

const Paper = styled.div`
  ${theme}
  min-height: 100vh;
`
const Wrapper = styled.div`
    max-width: 40em;
    margin: auto;
`

function Layout(props) {
  const [mode, setMode] = useState('light')
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  const handleClick = () => {
    if (mode === 'light') {
      setMode('dark')
    } else if (mode === 'dark') {
      setMode('light')
    }
  }

  return (
    <ThemeProvider theme={{ mode }}>
      <Paper>
          <Wrapper>

          <button onClick={handleClick}>{mode}</button>
          <Header title={title} root={location.pathname === rootPath} />
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
