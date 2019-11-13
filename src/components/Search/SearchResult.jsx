import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'


const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemHighlight = styled.div`
  background: rgba(0,0,0,.1);
  margin-left: 1em;
  padding-left: .5em;
`

const ItemBlurb = styled.div`
  margin-left: 1em;
  padding-left .5em;
`

function SearchResult({page, blurb}) {
  return (
    <li key={page.id}>
      <Item>
        <Link to={'/' + page.path}>{page.title}</Link>

          <ItemHighlight>{page.publish && `Published: ${page.publish}`}</ItemHighlight>
          <ItemHighlight>{!page.publish && page.date && `Date: ${page.date}`}</ItemHighlight>
          <ItemHighlight>{page.updated && `Upated: ${page.updated}`}</ItemHighlight>
          <ItemHighlight>{page.tags && ' Tags: ' + page.tags.join(`, `)}</ItemHighlight>

        <ItemBlurb>{blurb && blurb}</ItemBlurb>
      </Item>
    </li>
  )
}

export default SearchResult
