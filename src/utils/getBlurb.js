import { Link } from 'gatsby'

export default function getBlurb(page) {
  return (
    <p>
      {page.content.slice(0, 200)}
      <br />
      <Link to={`/${page.path}`}>&#10149;{`Read more`}</Link>
    </p>
  )
}