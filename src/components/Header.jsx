import React from 'react'
import styled from 'styled-components'
import { StyledLink } from './StyledLink'
import { LinkWrapper } from './LinkWrapper'

const SiteHeader = styled.header`
    background: transparent;
    display: flex;
    align-content: center;
    justify-content: center;
`

export function Header() {
    return (
        <SiteHeader>
            <LinkWrapper>
                <StyledLink to={`/`}>Home</StyledLink>
                <StyledLink to={`/blog`}>Blog</StyledLink>
                <StyledLink to={`/tags`}>Tags</StyledLink>
                <StyledLink to={`/others`}>Others</StyledLink>
            </LinkWrapper>
        </SiteHeader>
    )
}


