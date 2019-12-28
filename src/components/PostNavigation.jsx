import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

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
          <Link to={previous.fields.slug} rel="prev">
            &lArr; {previous.frontmatter.title}
          </Link>
        </ListItem>
      )}
      {next && (
        <ListItem align={'right'}>
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} &rArr;
          </Link>
        </ListItem>
      )}
    </List>
  )
}

export default PostNavigation
