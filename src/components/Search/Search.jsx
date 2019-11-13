import React, { useEffect, useState } from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import SearchResult from './SearchResult'

const SearchWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
`;


const ItemBlurb = styled.div`
  margin-left: 1em;
  padding-left .5em;
`

function getBlurb(page) {
  return (
    <ItemBlurb>
    {page.content.slice(0, 200)}<br/>
    <Link to={'/' + page.path} >&#10149;{`Read more`}</Link>
    </ItemBlurb>
    )
}

function Search(props) {
  const [query, setQuery] = useState('')
  const [searchValue] = useDebounce(query, 1000)
  const [results, setResults] = useState([])
  const [index, setIndex] = useState()

  useEffect(() => {
    const index = Index.load(props.searchIndex)
    setIndex(index)
  }, [props.searchIndex])

  useEffect(() => {
    if (index) {
      const searchResults = index
        .search(searchValue, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref))
      setResults(searchResults)
    }
  }, [index, searchValue])

  const handleQuery = event => setQuery(event.target.value)
  return (
    <div>
      <SearchWrapper >
        Search:{' '}
        <SearchInput
          type="text"
          value={query}
          onChange={handleQuery}
        />
        </SearchWrapper>
      <ul>
        {results &&
          results.map(page => {
            const blurb = getBlurb(page)
            return <SearchResult page={page} blurb={blurb} />
          })}
      </ul>
    </div>
  )
}

export default Search
