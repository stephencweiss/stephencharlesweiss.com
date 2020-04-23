import React from 'react'
import { SEO } from '../components'
import LandingBio from '../components/LandingBio'
import { useSiteMetadata } from '../hooks'

function MainIndex() {
    const { title, description } = useSiteMetadata()
    return (
        <>
            <SEO
                title={title}
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
            />
            <LandingBio title={title} description={description} />
        </>
    )
}

export default MainIndex
