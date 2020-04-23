import React from 'react'
import { Header } from '../components'
import styled from 'styled-components'

const Paper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`
const Wrapper = styled.div`
    max-width: 40em;
    margin: auto;
    flex: 1;
    @media screen and (max-width: 40em){
        max-width: 30em;
    }
    @media screen and (max-width: 30em){
        max-width: 25em;
    }
    @media screen and (max-width: 25em){
        max-width: 20em;
    }
`
const Footer = styled.div`
    display: flex;
    max-height: 30px;
    margin: 1rem;
    justify-content: center;
`

export function Layout({ children }) {
    return (
        <Paper>
            <Wrapper>
                <Header />
                {children}
            </Wrapper>
            <Footer>
                © {new Date().getFullYear()}&nbsp; Built with ❤️ using&nbsp;
                <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Footer>
        </Paper>
    )
}

export default Layout
