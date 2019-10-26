import React, { Component, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'

// underscoreJS Debounce via David Walsh - https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

function getBlurb(page) {
  return page.html.slice(0, 500).concat('...')
}

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = e => {
    const query = e.target.value
    this.index = this.getOrCreateIndex()

    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }

  handleQuery = e => {
    this.search(e)
  }

  render() {
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
            value={this.state.query}
            onChange={this.handleQuery}
          />
        </div>
        <ul>
          {this.state.results &&
            this.state.results.map(page => {
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
}

//
// const Search = function Search(props) {
//   const [query, setQuery] = useState('')
//   const [results, setResults] = useState([])
//   //   const [index, setIndex] = useState({})
//   console.log({ props })
//   const { searchIndex } = props

//   useEffect(() => {
//     if (!query) {
//       setResults([])
//       return
//     }

//     const lunrIndex = Index.build(searchIndex)
//     console.log({ lunrIndex })
//     // const searchResults = lunrIndex.index.search(query, { expand: true })
//     console.log(lunrIndex.index, lunrIndex.index.search)
//     // setResults(searchResults.map(({ ref }) => lunrIndex.store[ref]))
//   }, [query])

//   //   const getOrCreateIndex = () =>
//   //     index
//   //       ? index
//   //       : // Create an elastic lunr index and hydrate with graphql query results
//   //         setIndex(Index.load(searchIndex))

//   //   const search = e => {
//   //     console.log(e, e.target, e.target.value)
//   //     const query = e.target.value
//   //     Object.keys(index).length === 0 && getOrCreateIndex()

//   //     setQuery(query)
//   //     setResults(
//   //       index
//   //         .search(query, { expand: true })
//   //         // Map over each ID and return the full document
//   //         .map(({ ref }) => index.documentStore.getDoc(ref))
//   //     )
//   //   }

//   //   const handleQuery = e => {
//   //     search(e)
//   //   }

//   const handleQuery = event => setQuery(event.target.value)

//   return (
//     <div>
//       <div
//         style={{
//           display: 'flex',
//           flex: 1,
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}
//       >
//         Search:{' '}
//         <input
//           style={{ width: '100%' }}
//           type="text"
//           value={query}
//           onChange={handleQuery}
//         />
//       </div>
//       <ul>
//         {results &&
//           results.map(page => {
//             const blurb = getBlurb(page)
//             return (
//               <li key={page.id}>
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}
//                 >
//                   <Link to={'/' + page.path}>{page.title}</Link>
//                   <div
//                     style={{
//                       background: 'rgba(0,0,0,.1)',
//                       marginLeft: '1em',
//                     }}
//                   >
//                     {page.tags && ' Tags: ' + page.tags.join(`, `)}
//                   </div>
//                   <div style={{ marginLeft: '1em' }}>{blurb && blurb}</div>
//                 </div>
//               </li>
//             )
//           })}
//       </ul>
//     </div>
//   )
// }

// export default Search
