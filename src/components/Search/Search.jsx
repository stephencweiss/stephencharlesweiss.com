import React, { useEffect, useState } from 'react'
import { Index } from 'elasticlunr'
import { useDebounce } from 'use-debounce'
import SearchResults from './SearchResults'

import { SearchInput, SearchItemWrapper } from './Search.styled'
import SearchResult from './SearchResult'

function Search(props) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchValue] = useDebounce(query, 1000)
  const [results, setResults] = useState([])
  const [index, setIndex] = useState()

  useEffect(() => {
    const index = Index.load(props.searchIndex)
    setIndex(index)
  }, [props.searchIndex])

  useEffect(() => {
    if (index) {
      console.log({ loading, searchValue })
      const searchResults = index
        .search(searchValue, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref))
      //TODO: Reduce searchResults duplicates based on slug (which should be unique)
      setResults(searchResults)
      setLoading(false)
    }
  }, [index, searchValue, setLoading, loading])

  const handleQuery = event => {
    setLoading(true)
    setQuery(event.target.value)
  }

  return (
    <React.Fragment>
      <SearchItemWrapper>
        Search: <SearchInput type="text" value={query} onChange={handleQuery} />
      </SearchItemWrapper>
      {results.length > 0 && <SearchResults loading={loading} results={results} setQuery={setQuery}/>}
    </React.Fragment>
  )
}

export default Search
