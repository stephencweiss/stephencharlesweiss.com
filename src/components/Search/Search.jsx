import React, { useEffect, useState } from 'react'
import { Index } from 'elasticlunr'
import { useDebounce } from 'use-debounce'
import SearchResult from './SearchResult'
import { PostHeader } from '../PostLink'
import {
  SearchContainer,
  SearchInput2,
  SearchItemWrapper2,
} from './Search.styled'

import styled from 'styled-components'
import getBlurb from '../../utils/getBlurb'

export const SearchItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`

export const SearchInput = styled.input`
  flex: 1;
  width: 100%;
  margin-left: 0.5em;
`

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
      //TODO: Reduce searchResults duplicates based on slug (which should be unique)
      setResults(searchResults)
    }
  }, [index, searchValue])

  const handleQuery = event => setQuery(event.target.value)
  return (
    <React.Fragment>
      <p>search bar with imported styled components</p>
      <SearchItemWrapper2 >
        Search: <SearchInput2 type="text" value={query} onChange={handleQuery} />
      </SearchItemWrapper2>
      <p>search bar with styled components</p>
      <SearchItemWrapper >
        Search: <SearchInput type="text" value={query} onChange={handleQuery} />
      </SearchItemWrapper>
      <p>semantic html with inline styles</p>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        Search: <input style={{width: '100%', flex: 1, margineLeft: '0.5em'}} type="text" value={query} onChange={handleQuery} />
      </div>
      {results.length > 0 && <PostHeader>Results</PostHeader>}
      {results.length > 0 && (
        <SearchContainer>
          {results.map(page => {
            const blurb = getBlurb({content: page.content, path: page.path })
            return <SearchResult page={page} blurb={blurb} />
          })}
        </SearchContainer>
      )}
    </React.Fragment>
  )
}

export default Search
