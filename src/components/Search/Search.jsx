import React, { useEffect, useState } from 'react'
import { Index } from 'elasticlunr'
import { useDebounce } from 'use-debounce'
import SearchResult from './SearchResult'
import {
    SearchContainer,
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
            <SearchItemWrapper>
                Search:&nbsp;
                <SearchInput type="text" value={query} onChange={handleQuery} />
            </SearchItemWrapper>
            {results.length > 0 && <h3>Results</h3>}
            {results.length > 0 && (
                <SearchContainer>
                    {results.map(page => {
                        const blurb = (
                            <Blurb content={page.content} path={page.path} />
                        )
                        return <SearchResult page={page} blurb={blurb} />
                    })}
                </SearchContainer>
            )}
        </React.Fragment>
    )
}

export default Search
