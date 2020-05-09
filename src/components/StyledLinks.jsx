import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

export const NavLink = styled(GatsbyLink)`
    color: black;
    text-decoration: ${({ active }) =>
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
export const ListedLink = ({ to, children }) => (
    <li>
        <LinkInList to={to}>{children}</LinkInList>
    </li>
)
