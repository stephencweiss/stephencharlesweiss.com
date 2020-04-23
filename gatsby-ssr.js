/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require('react')
const Layout = require('./src/components/Layout')

exports.wrapRootElement = props => {
    const { element } = props
    return <Layout>{element}</Layout>
}
