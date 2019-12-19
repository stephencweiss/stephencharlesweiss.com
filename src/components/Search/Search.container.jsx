import React from 'react'
import { StaticQuery } from 'gatsby'
import { graphql } from 'gatsby'

import Search from './Search'

function SearchContainer() {
  return (
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          siteSearchIndex {
            index
          }
        }
      `}
      render={data => (
        <header>
          <Search searchIndex={data.siteSearchIndex.index} />
        </header>
      )}
    />
  )
}

export default SearchContainer
