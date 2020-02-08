import React, { useContext } from 'react'
import { PostLink, PostDate } from '.'
import { getBlurb } from '../utils'
import styled, { ThemeContext } from 'styled-components'
import { blackish, solarized } from '../theme/colors'


/**
 * WIP - Need to figure out hwo to get themes in!
 */
const Card = styled.div`
  border: 2px solid ${({ theme }) => theme.border};
  margin: 1em 0;
  background: ${({ theme }) => {
    console.log({ theme })
    return theme.border
  }};
`
const theme = {
  light: {
    background: solarized,
    border: blackish,
  },
  dark: {
    background: blackish,
    border: solarized,
  },
}

const ContentWrapper = styled.div`
  padding: 0.5em;
`

export function EntryCard({ node }) {
  const { title } = node.frontmatter
  const { listDate, slug } = node.fields
  const { excerpt } = node
  const themeContext = useContext(ThemeContext)
  console.log({ themeContext })
  return (
    <Card theme={themeContext.mode}>
      <ContentWrapper>
        <PostLink slug={slug} title={title} />
        <PostDate>{listDate}</PostDate>
        {getBlurb({ content: excerpt, path: slug })}
      </ContentWrapper>
    </Card>
  )
}
