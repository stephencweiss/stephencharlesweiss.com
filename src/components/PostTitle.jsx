import React from 'react'
import { StyledLink } from '.'
import styled, { css } from 'styled-components'

const HighlighterGradient = css`
linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
)`

export const MarkerStyle = css`
    display: inline;
    border-radius: 1em 0 1em 0;
    padding: 0.5em;
    background: ${HighlighterGradient};
    :focus,
    :focus-within,
    :hover {
        background: transparent;
    }
`

export const MarkerHeader = styled.h3`
    ${MarkerStyle}
`
export const Title = styled.h1`
    ${MarkerStyle}
`
export function PostTitleLink({ slug, title }) {
    return (
        <MarkerHeader>
            <StyledLink to={slug}>{title}</StyledLink>
        </MarkerHeader>
    )
}

export function PostTitle({ title }) {
    return <Title>{title}</Title>
}
