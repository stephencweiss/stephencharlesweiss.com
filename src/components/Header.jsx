import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { NavLink, LinkWrapper } from './index'
import initials from '../assets/initials.svg'

const SiteHeader = styled.header`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    background: transparent;
`

const ContainerHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    grid-template-areas: '
        logo links
    ';

    justify-content: space-between;

    @media screen and (min-width: 40rem) {
        min-width: 40rem;
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

const Links = styled.div`
    grid-template: 'links';
    justify-self: end;
`

export function Header({ menuOptions }) {
    const location = useLocation()
    return (
        <>
            <SiteHeader>
                <ContainerHeader>
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
                    <Links>
                        <LinkWrapper>
                            {menuOptions.map(({ label, path, active }) => {
                                return (
                                    <NavLink
                                        key={label}
                                        active={active}
                                        to={path}
                                    >
                                        {label}
                                    </NavLink>
                                )
                            })}
                        </LinkWrapper>
                    </Links>
                </ContainerHeader>
            </SiteHeader>
        </>
    )
}
