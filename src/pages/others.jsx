import React from 'react'
import styled from 'styled-components'
import { SimpleLink, LinkWrapper, Layout, SEO } from '../components'



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
            <p>A series of links to other pages on this site.</p>
            <ColumnLinkWrapper>
                <ul>
                    <li>
                        <SimpleLink to={'/books'}>Books</SimpleLink>
                    </li>
                    <li>
                        <SimpleLink to={'/lists'}>Lists</SimpleLink>
                    </li>
                    <li>
                        <SimpleLink to={'/stats/current-stats'}>Stats</SimpleLink>
                    </li>
                    <li>
                        <SimpleLink to={'/xkcd'}>XKCD Digest</SimpleLink>
                    </li>
                </ul>
            </ColumnLinkWrapper>
        </Layout>
    )
}

export default Others
