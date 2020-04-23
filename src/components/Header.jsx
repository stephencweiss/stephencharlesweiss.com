import React, { useEffect, useState } from 'react'
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
    const [active, setActive] = useState(null)
    useEffect(() => {
        const pathname = window
            ? window.location.pathname
            : console.warn(`window undefined`)

        if (!pathname) {
            console.warn(`Nothing to see here. No pathname`)
        } else if (pathname === '/') {
            setActive('ROOT')
        } else if (pathname.includes('/blog')) {
            setActive('BLOG')
        } else if (pathname.includes('/tags')) {
            setActive('TAGS')
        } else {
            setActive('OTHER')
        }
    }, [active])

    return (
        <SiteHeader>
            <LinkWrapper>
                <StyledLink active={active === 'ROOT'} to={`/`}>
                    Home
                </StyledLink>
                <StyledLink active={active === 'BLOG'} to={`/blog`}>
                    Blog
                </StyledLink>
                <StyledLink active={active === 'TAGS'} to={`/tags`}>
                    Tags
                </StyledLink>
                <StyledLink active={active === 'OTHER'} to={`/others`}>
                    Others
                </StyledLink>
            </LinkWrapper>
        </SiteHeader>
    )
}
