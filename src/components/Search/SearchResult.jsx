import React from 'react'
import { Item, ItemBlurb, ItemHighlight, ListItem } from './Search.styled'

import PostLink from '../PostLink'

function SearchResult({ page, blurb }) {
  return (
    <ListItem key={page.id}>
      <Item>
        <PostLink slug={`/${page.path}`} title={page.title} />
        <ItemHighlight>
          {page.publish && `Published: ${page.publish}`}
        </ItemHighlight>
        <ItemHighlight>
          {!page.publish && page.date && `Date: ${page.date}`}
        </ItemHighlight>
        <ItemHighlight>
          {page.updated && `Upated: ${page.updated}`}
        </ItemHighlight>
        <ItemHighlight>
          {page.tags && ' Tags: ' + page.tags.join(`, `)}
        </ItemHighlight>
        <ItemBlurb>{blurb && blurb}</ItemBlurb>
      </Item>
    </ListItem>
  )
}

export default SearchResult
