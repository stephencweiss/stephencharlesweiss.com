import React from 'react'
import { Layout, SEO } from '../components'
import LandingBio from '../components/LandingBio'
import { useSiteMetadata } from '../hooks'

function MainIndex() {
    const {title, description} = useSiteMetadata()
    return (
        <Layout>
            <SEO
                title={title}
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <LandingBio title={title} description={description}/>
        </Layout>
    )
}

export default MainIndex
