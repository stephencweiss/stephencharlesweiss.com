import React from 'react'
import { NavLink } from '.'
import styled, { css } from 'styled-components'

const HighlighterGradient = css`
linear-gradient(
    to right,
    #FFFCEC,
    #FDF6E3 5%,
    #FFFDED
)`

export const MarkerStyle = css`
    display: inline-block;
    border-radius: 1em 0 1em 0;
    padding: 0.5em;
    background-image: ${HighlighterGradient};
`

const MarkerH3 = styled.h3`
    margin: 0;
    ${MarkerStyle}
`

export const Title = styled.h1`
    ${MarkerStyle}
`
export function PostTitleLink({ slug, title }) {
    return (
        <MarkerH3>
            <NavLink to={slug}>{title.toLowerCase()}</NavLink>
        </MarkerH3>
    )
}

export function PostTitle({ title }) {
    return <Title>{title.toLowerCase()}</Title>
}
