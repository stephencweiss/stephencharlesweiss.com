import React from 'react'
import { LandingBio, Layout, SEO } from '../components'
import { useSiteMetadata } from '../hooks'

function Home() {
    const { title, description } = useSiteMetadata()
    return (
        <Layout>
            <SEO title={title} keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
            <LandingBio title={title} description={description} />
        </Layout>
    )
}

export default Home
