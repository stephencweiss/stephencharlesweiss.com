import React, { useState } from 'react'
import { Header } from '../components/Headers'
import styled from 'styled-components'

const Paper = styled.div`
    min-height: 100vh;
`
const Wrapper = styled.div`
    max-width: 40em;
    margin: auto;
`

export function Layout(props) {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
        <Paper>
            <Wrapper>
                <Header title={title} root={location.pathname === rootPath} />
                {children}
                <footer>
                    © {new Date().getFullYear()}&nbsp; Built with ❤️ using&nbsp;
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </Wrapper>
        </Paper>
    )
}

export default Layout
