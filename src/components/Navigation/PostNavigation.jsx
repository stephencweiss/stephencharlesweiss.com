import React from 'react'
import styled from 'styled-components'
import { StyledLink } from '../index'

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  flex: 1;
  text-align: ${({ align }) => (align ? align : '')};
`

function PostNavigation(props) {
  const { previous, next } = props
  return (
    <List>
      {previous && (
        <ListItem align={'left'}>
          <StyledLink to={previous.fields.slug} rel="prev">
            &lArr; Previous: {previous.frontmatter.title}
          </StyledLink>
        </ListItem>
      )}
      {next && (
        <ListItem align={'right'}>
          <StyledLink to={next.fields.slug} rel="next">
            Next: {next.frontmatter.title} &rArr;
          </StyledLink>
        </ListItem>
      )}
    </List>
  )
}

export default PostNavigation
