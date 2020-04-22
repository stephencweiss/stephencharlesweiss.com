import React from 'react'
import styled from 'styled-components'
import { ListedLink, LinkWrapper, Layout, SEO } from '../components'

const ColumnLinkWrapper = styled(LinkWrapper)`
    display: flex;
    flex-direction: column;
    padding: 0;
    a:first-of-type {
        padding: 0;
    }
`

function Others(props) {
    return (
        <Layout>
            <SEO
                title={'other pages'}
                keywords={[
                    `lists`,
                    `books`,
                    `random`,
                    `directory`,
                    `stats`,
                    `xkcd`,
                ]}
            />
            <h1>Other Pages</h1>
            <p>Links to the other pages on this site.</p>
            <ColumnLinkWrapper>
                <ul>
                    <ListedLink to={'/books'}>Books</ListedLink>
                    <ListedLink to={'/lists'}>Lists</ListedLink>
                    <ListedLink to={'/stats/current-stats'}>Stats</ListedLink>
                    <ListedLink to={'/xkcd'}>XKCD Digest</ListedLink>
                </ul>
            </ColumnLinkWrapper>
        </Layout>
    )
}

export default Others
