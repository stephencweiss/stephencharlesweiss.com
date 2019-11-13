import React from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

export const PostHeader = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

function PostLink({ slug, title }) {
  return (
    <PostHeader>
      <Link style={{ boxShadow: `none` }} to={slug}>
        {title}
      </Link>
    </PostHeader>
  )
}

export default PostLink;