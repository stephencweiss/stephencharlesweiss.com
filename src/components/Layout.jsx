import React from 'react'
import { EntryHeader, RootHeader } from '../components/Headers';

// import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            //   maxWidth: rhythm(24),
            //   padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {location.pathname === rootPath ? <RootHeader title={title} /> : <EntryHeader title={title} /> }
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with ❤️ using
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )
  }
}

export default Layout
