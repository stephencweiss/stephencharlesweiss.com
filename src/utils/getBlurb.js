import React from 'react'
import { Link } from 'gatsby'

export default function getBlurb({content, path}) {
    return (
    <React.Fragment>
      <p>{content && content.length > 200 ? content.slice(0, 200).concat(' ...') : content}</p>
      <Link to={`/${path}`}>&#10149;{`Read more`}</Link>
    </React.Fragment>
  )
}
