import React from 'react'
import { StyledLink } from '.'
import styled, {css} from 'styled-components'

export const MarkerStyle = css`
display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );`

export const MarkerHeader = styled.h3`
  ${MarkerStyle}
`

export function PostTitleLink({ slug, title }) {
  return (
    <MarkerHeader>
      <StyledLink to={slug}>
        {title}
      </StyledLink>
    </MarkerHeader>
  )
}
