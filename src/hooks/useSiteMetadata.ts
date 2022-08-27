import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          author
          description
          menuOptions {
              label
              path
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
