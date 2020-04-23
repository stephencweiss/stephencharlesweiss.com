import React from 'react'
import styled from 'styled-components'
import { ListedLink, ColumnLinkWrapper, Layout, SEO } from '../components'



function Others() {
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
