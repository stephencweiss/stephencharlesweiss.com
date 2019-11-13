import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import PostLink from '../PostLink'

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemHighlight = styled.small`
  background: rgba(0,0,0,.1);
  margin-left: 1em;
  padding-left: .5em;
`

const ItemBlurb = styled.div`
  margin-left: 1em;
  padding-left .5em;
`

const ListItem = styled.li`
  list-style: none;
`

function SearchResult({page, blurb}) {
  return (
    <ListItem key={page.id}>
      <Item>
        <PostLink slug={`/${page.page}`} title={page.title}/>
          <ItemHighlight>{page.publish && `Published: ${page.publish}`}</ItemHighlight>
          <ItemHighlight>{!page.publish && page.date && `Date: ${page.date}`}</ItemHighlight>
          <ItemHighlight>{page.updated && `Upated: ${page.updated}`}</ItemHighlight>
          <ItemHighlight>{page.tags && ' Tags: ' + page.tags.join(`, `)}</ItemHighlight>
        <ItemBlurb>{blurb && blurb}</ItemBlurb>
      </Item>
    </ListItem>
  )
}

export default SearchResult
