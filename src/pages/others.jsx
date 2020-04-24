import React from 'react'
import { Layout, ListedLink, ColumnLinkWrapper, SEO } from '../components'

function Others() {
    return (
        <Layout>
            <SEO
                title={'others'}
                keywords={[
                    `lists`,
                    `books`,
                    `random`,
                    `directory`,
                    `stats`,
                    `xkcd`,
                ]}
            />
            <h1>others</h1>
            <p>links to the other pages on this site.</p>
            <ColumnLinkWrapper>
                <ul>
                    <ListedLink to={'/books'}>books</ListedLink>
                    <ListedLink to={'/lists'}>lists</ListedLink>
                    <ListedLink to={'/stats/current-stats'}>stats</ListedLink>
                    <ListedLink to={'/xkcd'}>xkcd digest</ListedLink>
                </ul>
            </ColumnLinkWrapper>
        </Layout>
    )
}

export default Others
