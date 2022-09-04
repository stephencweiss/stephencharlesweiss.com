import React, { useEffect, useState } from 'react'
import { Index } from 'elasticlunr'
import { useDebounce } from 'use-debounce'
import SearchResult from './SearchResult'
import {
    SearchResultsContainer,
    SearchInput,
    SearchItemWrapper,
} from './Search.styled'
import { Blurb } from '../index'

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
            const searchResults = (index as any)
                .search(searchValue, { expand: true })
                .map(({ ref }: {ref: any}) => (index as any).documentStore.getDoc(ref))
            setResults(searchResults)
        }
    }, [index, searchValue])

    const handleQuery = (event: any) => setQuery(event.target.value)
    return (
        <React.Fragment>
            <SearchItemWrapper>
                <label style={{ width: '100%' }} htmlFor="searchInput">
                    <SearchInput
                        id="searchInput"
                        type="text"
                        placeholder="what would you like to search for?"
                        value={query}
                        onChange={handleQuery}
                    />
                </label>
            </SearchItemWrapper>
            {results.length > 0 && <h3>Results</h3>}
            {results.length > 0 && (
                <SearchResultsContainer>
                    {results.map((page: any) => {
                        const blurb = (
                            <Blurb content={page.content} />
                        )
                        return <SearchResult page={page} blurb={blurb} />
                    })}
                </SearchResultsContainer>
            )}
        </React.Fragment>
    )
}

export default Search
