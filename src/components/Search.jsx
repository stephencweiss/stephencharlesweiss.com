import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'

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
