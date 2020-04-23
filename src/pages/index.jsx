import React from 'react'
import { Layout, SEO } from '../components'
import LandingBio from '../components/LandingBio'
import { useSiteMetadata } from '../hooks'

function MainIndex(props) {
    const {title, description} = useSiteMetadata()
    return (
        <Layout location={props.location}>
            <SEO
                title={title}
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <LandingBio title={title} description={description}/>
        </Layout>
    )
}

export default MainIndex
