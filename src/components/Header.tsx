import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { NavLink, LinkWrapper } from './index'
import initials from '../assets/initials.svg'

const SiteHeader = styled.header`
    align-content: center;
    align-items: center;
    background: transparent;
`

const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    @media screen and (min-width: 40rem) {
        flex-direction: row-reverse;
    }
`

const Logo = styled.img`
    height: 1.25rem;
    object-fit: contain;
    margin: 0;
    margin-right: 0.5rem;
    border-radius: 50%;
`

const Main = styled.div`
    grid-area: logo;
    justify-self: start;
    display: flex;
    align-content: center;
    align-items: center;
`
type MenuOptions = {
    menuOptions: Array<{label: string, path: string, active: string}>
}
export function Header({ menuOptions }: MenuOptions) {
    const location = useLocation()
    return (
        <>
            <SiteHeader>
                <ContainerHeader>
                    <LinkWrapper>
                        {menuOptions.map(({ label, path, active }) => {
                            return (
                                <NavLink key={label} active={active} to={path}>
                                    {label}
                                </NavLink>
                            )
                        })}
                    </LinkWrapper>
                    {location.pathname !== '/' && (
                        <LinkWrapper>
                            <NavLink to={'/'}>
                                <Main>
                                    <Logo
                                        src={initials}
                                        alt={'logo of initials'}
                                    />
                                    /* Code Comments */
                                </Main>
                            </NavLink>
                        </LinkWrapper>
                    )}
                </ContainerHeader>
            </SiteHeader>
        </>
    )
}
