import React from 'react'
import { Link } from 'gatsby'
import { Item, ItemBlurb, ItemHighlight, ListItem } from './Search.styled'

import PostLink from '../PostLink'

function createLinks(type, elements, setQuery) {
  if (!elements) return null
  return (
    <React.Fragment>
      {`${type}: `}
      {elements.map((item, index, array) => {
        const includeComma = array.length - index > 1
        return (<Link key={item} onClick={() => setQuery(item)}>
          {index === 0 ? ' ' : ''}
          {item}
          {includeComma ? ', ' : ''}
        </Link>)
      })}
    </React.Fragment>
  )
}

function SearchResult({ page, blurb, setQuery }) {
  const linkedTags = createLinks('Tags', page.tags, setQuery)
  const linkedCategories = createLinks('Category', page.category, setQuery)

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
        <ItemHighlight>{linkedCategories}</ItemHighlight>
        <ItemHighlight>{linkedTags}</ItemHighlight>
        <ItemBlurb>{blurb && blurb}</ItemBlurb>
      </Item>
    </ListItem>
  )
}

export default SearchResult
