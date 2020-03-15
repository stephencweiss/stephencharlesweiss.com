import React from 'react'
import { PostLink, PostDate } from '.'
import { getBlurb } from '../utils'
import styled, { ThemeContext } from 'styled-components'

const Card = styled.div`
  border: 2px solid rgba(0,0,0,.75);
  margin: 1em 0;
  background: rgba(255,255,255,.85);
`
const ContentWrapper = styled.div`
  padding: 0.5em;
`

export function EntryCard({ node }) {
  const { title } = node.frontmatter
  const { listDate, slug } = node.fields
  const { excerpt } = node
  return (
    <Card>
      <ContentWrapper>
        <PostLink slug={slug} title={title} />
        <PostDate>{listDate}</PostDate>
        {getBlurb({ content: excerpt, path: slug })}
      </ContentWrapper>
    </Card>
  )
}
