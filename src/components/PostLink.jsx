import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { space } from 'styled-system'

export const PostHeader = styled.h3`
  margin-bottom: ${space.small};
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