import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    const { results, query } = this.state
    console.log({ results, query })
    return (
      <div>
        Search:{' '}
        <input type="text" value={this.state.query} onChange={this.search} />
        <ul>
          {this.state.results &&
            this.state.results.map(page => (
              <li key={page.id}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={'/' + page.path}>{page.title}</Link>
                  <div style={{ 'margin-left': '1em' }}>
                    {' Tags: ' + page.tags.join(`, `)}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
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
}
