const React = require('react')
const { Link } = require('gatsby')

function getBlurb({ content, path }) {
  return (
    <React.Fragment>
      <p>
        {content && content.length > 200
          ? content.slice(0, 200).concat(' ...')
          : content}
      </p>
      <Link to={`/${path}`}>&#10149;{`Read more`}</Link>
    </React.Fragment>
  )
}

module.exports = { getBlurb }
