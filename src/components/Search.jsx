import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'
import { useDebounce } from 'use-debounce'

function getBlurb(page) {
  return page.content.slice(0, 500).concat('...')
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
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        Search:{' '}
        <input
          style={{ width: '100%' }}
          type="text"
          value={query}
          onChange={handleQuery}
        />
      </div>
      <ul>
        {results &&
          results.map(page => {
            const blurb = getBlurb(page)
            return (
              <li key={page.id}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Link to={'/' + page.path}>{page.title}</Link>
                  <div
                    style={{
                      background: 'rgba(0,0,0,.1)',
                      marginLeft: '1em',
                    }}
                  >
                    {page.tags && ' Tags: ' + page.tags.join(`, `)}
                  </div>
                  <div style={{ marginLeft: '1em' }}>{blurb && blurb}</div>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Search
