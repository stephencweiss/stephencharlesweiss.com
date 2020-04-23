import React from 'react'
import { StyledLink } from '.'
import styled, { css } from 'styled-components'

const HighlighterGradient = css`
linear-gradient(
    to right,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 5%,
    rgba(255, 250, 150, 0.25)
)`

export const MarkerStyle = css`
    display: inline;
    border-radius: 1em 0 1em 0;
    padding: 0.5em;
    background-image: ${HighlighterGradient};
`

const MarkerH3 = styled.h3`
    ${MarkerStyle}
`

export const Title = styled.h1`
    ${MarkerStyle}
`
export function PostTitleLink({ slug, title }) {
    return (
        <MarkerH3>
            <StyledLink to={slug}>{title}</StyledLink>
        </MarkerH3>
    )
}

export function PostTitle({ title }) {
    return <Title>{title}</Title>
}
