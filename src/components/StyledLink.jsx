import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

export const StyledLink = styled(GatsbyLink)`
    color: black;
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

    :hover::after, :focus::after, :focus-within::after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
`

export const SimpleLink = styled(StyledLink)`
    margin: 0;
    padding-top: 1.25rem;
`
export const ListedLink = ({ to, children }) => (
    <li>
        <SimpleLink to={to}>{children}</SimpleLink>
    </li>
)
