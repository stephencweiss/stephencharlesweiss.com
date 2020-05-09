import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'


import Search from './Search'

function SearchContainer() {
    const data = useStaticQuery(graphql`
        {
            siteSearchIndex {
                index
            }
        }
    `)

    return (
        <header>
            <Search searchIndex={data.siteSearchIndex.index} />
        </header>
    )
}

export default SearchContainer
