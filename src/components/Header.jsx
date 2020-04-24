import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from './StyledLinks'
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
                <NavLink active={(active === 'ROOT').toString()} to={`/`}>
                    Home
                </NavLink>
                <NavLink active={(active === 'BLOG').toString()} to={`/blog`}>
                    Blog
                </NavLink>
                <NavLink active={(active === 'TAGS').toString()} to={`/tags`}>
                    Tags
                </NavLink>
                <NavLink active={(active === 'OTHER').toString()} to={`/others`}>
                    Others
                </NavLink>
            </LinkWrapper>
        </SiteHeader>
    )
}
