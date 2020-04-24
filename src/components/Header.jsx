import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { NavLink, LinkWrapper } from './index'

const SiteHeader = styled.header`
    background: transparent;
    display: flex;
    align-content: center;
    justify-content: center;
`

export function Header({ menuOptions }) {
    const location = useLocation()
    return (
        <SiteHeader>
            <LinkWrapper>
                {menuOptions.map(({ label, path }) => (
                    <NavLink
                        active={(location.pathname === path).toString()}
                        to={path}
                    >
                        {label}
                    </NavLink>
                ))}
            </LinkWrapper>
        </SiteHeader>
    )
}
