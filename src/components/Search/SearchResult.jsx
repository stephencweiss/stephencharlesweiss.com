import React from 'react'
import {Link} from 'gatsby'
import { Item, ItemBlurb, ItemHighlight, ListItem } from './Search.styled'

import PostLink from '../PostLink'

function createLinks(item, index, array, setQuery){
  const includeComma = array.length - index > 1
  return <Link key={index} onClick={() => setQuery(item)}>{item}{includeComma ? ', ':''}</Link>
}

function SearchResult({ page, blurb, setQuery }) {

  const linkedTags = page.tags && page.tags.map((item, index, array) => createLinks(item, index, array, setQuery))

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
          {page.category && ' Category: ' + page.category.join(`, `)}
        </ItemHighlight>
        <ItemHighlight>
          {' Tags: '}
          {linkedTags && linkedTags.map(el =>el)}
        </ItemHighlight>
        <ItemBlurb>{blurb && blurb}</ItemBlurb>
      </Item>
    </ListItem>
  )
}

export default SearchResult
