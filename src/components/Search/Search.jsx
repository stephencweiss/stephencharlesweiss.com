import React, { useEffect, useState } from 'react'
import { Index } from 'elasticlunr'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import SearchResult from './SearchResult'
import { PostHeader } from '../PostLink'

const SearchItemWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
`

const SearchContainer = styled.ul`
  border: 2px solid black;
  padding: 0 0.5em;
  margin: 0;
`

function getBlurb(page) {
  return (
    <p>
      {page.content.slice(0, 200)}
      <br />
      <Link to={`/${page.path}`}>&#10149;{`Read more`}</Link>
    </p>
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
      <SearchItemWrapper>
        Search: <SearchInput type="text" value={query} onChange={handleQuery} />
      </SearchItemWrapper>
      {results.length > 0 && <PostHeader>Results</PostHeader>}
      {results.length > 0 && (
        <SearchContainer>
          {results.map(page => {
            const blurb = getBlurb(page)
            return <SearchResult page={page} blurb={blurb} />
          })}
        </SearchContainer>
      )}
    </div>
  )
}

export default Search
