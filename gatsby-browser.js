import React from 'react'
import Layout from './src/components/Layout'

// prism stylesheets
import 'prismjs/plugins/command-line/prism-command-line.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/themes/prism-solarizedlight.css'
// my style sheets
import './src/stylesheets/_reset.css'
import './src/stylesheets/global.css'
import './src/stylesheets/code.css'

export const wrapRootElement = props => {
    const { element } = props
    return <Layout>{element}</Layout>
}
