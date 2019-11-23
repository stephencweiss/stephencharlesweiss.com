import React from 'react'
import SearchResult from './SearchResult'
import { PostHeader } from '../PostLink'
import { SearchContainer } from './Search.styled'
import getBlurb from '../../utils/getBlurb'

function SearchResults({ loading, results, setQuery }) {


  return (
    <React.Fragment>
      {loading && results.length > 0 ? <div>loading...</div> : null}
      {!loading && results.length > 0 && <PostHeader>Results</PostHeader>}
      {!loading && results.length > 0 && (
        <React.Fragment>
          <SearchContainer>
            {results.map(page => {
              const blurb = getBlurb({ content: page.content, path: page.path })
              return (
                <SearchResult
                  key={page.path}
                  page={page}
                  blurb={blurb}
                  setQuery={setQuery}
                />
              )
            })}
          </SearchContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SearchResults