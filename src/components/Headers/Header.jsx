import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

const SiteHeader = styled.header`
    background: transparent;
    display: flex;
    align-content: center;
    justify-content: center;

    a:first-of-type {
        margin: 0;
    }
`

const LinkWrapper = styled.div`
    max-width: 860px;
    padding: 1rem 1.0875rem;
    font-size: 1.5rem;
`

export const HeaderLink = styled(GatsbyLink)`
    color: black;
    margin-left: 15px;
    text-decoration: none;
    display: inline-block;
    position: relative;

    ::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        transform-origin: bottom right;
        transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    }

    :hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
`

function Header() {
    return (
        <SiteHeader>
            <LinkWrapper>
                <HeaderLink to={`/`}>Home</HeaderLink>
                <HeaderLink to={`/blog`}>Blog</HeaderLink>
                <HeaderLink to={`/tags`}>Tags</HeaderLink>
                <HeaderLink to={`/others`}>Others</HeaderLink>
            </LinkWrapper>
        </SiteHeader>
    )
}

export default Header
