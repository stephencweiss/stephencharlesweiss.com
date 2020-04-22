import React from 'react'
import styled from 'styled-components'
import { StyledLink, LinkWrapper, Layout, SEO } from '../components'

const Link = styled(StyledLink)`
    as: li;
    margin: 0;
    padding-top: 1.25rem;
`

const ColumnLinkWrapper = styled(LinkWrapper)`
    display: flex;
    flex-direction: column;
    padding: 0;
    a:first-of-type {
        padding: 0;
    }
`

function Others(props) {
    console.log({ props })
    return (
        <Layout>
            <SEO
                title={'other pages'}
                keywords={[`lists`, `books`, `random`, `directory`,`stats`,`xkcd`]}
            />
            <h1>Other Pages</h1>
            <p>A series of links to other pages on this site.</p>
            <ColumnLinkWrapper>
                <Link to={'/books'}>Books</Link>
                <Link to={'/lists'}>Lists</Link>
                <Link to={'/stats/current-stats'}>Stats</Link>
                <Link to={'/xkcd'}>XKCD Digest</Link>
            </ColumnLinkWrapper>
        </Layout>
    )
}

export default Others
