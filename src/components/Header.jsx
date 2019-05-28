import React from 'react'
import { StaticQuery, Link } from 'gatsby'
import { graphql } from 'gatsby'

import Search from './Search'

const Header = () => (
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
        Search: <Search searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />
)

export default Header
