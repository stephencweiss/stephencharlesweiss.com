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
    const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
    const rootActive = pathname==='/'
    const blogActive = pathname.includes('blog')
    const tagsActive = pathname.includes('tags')
    const otherActive = !rootActive && !blogActive && !tagsActive


    return (
        <SiteHeader>
            <LinkWrapper>
                <StyledLink active={rootActive} to={`/`}>Home</StyledLink>
                <StyledLink active={blogActive} to={`/blog`}>Blog</StyledLink>
                <StyledLink active={tagsActive} to={`/tags`}>Tags</StyledLink>
                <StyledLink active={otherActive} to={`/others`}>Others</StyledLink>
            </LinkWrapper>
        </SiteHeader>
    )
}


