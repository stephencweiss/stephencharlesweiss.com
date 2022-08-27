import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

export const NavLink = styled(GatsbyLink)`
    color: black;
    text-decoration: ${({ active }: {active?: string}) =>
        active === 'true' ? 'underline' : 'none'};

    ::after {
        background-color: rgba(0, 0, 0, 0.8);
    }

    :hover,
    :focus,
    :focus-within {
        text-decoration: ${({ active }) => (active ? `none` : '')};
    }
`

const LinkInList = styled(NavLink)`
    margin: 0;
    padding-top: 1.25rem;
`

type ListedLinkProps = React.PropsWithChildren<{to: string}>

export const ListedLink = ({ to, children }: ListedLinkProps) => (
    <li>
        <LinkInList to={to}>{children}</LinkInList>
    </li>
)
