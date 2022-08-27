import React from 'react'
import { Layout, ListedLink, ColumnLinkWrapper, SEO } from '../components'

function Others() {
    return (
        <Layout>
            <SEO
                title={'others'}
                keywords={[
                    `lists`,
                    `blogroll`,
                    `books`,
                    `random`,
                    `directory`,
                    `reviews`,
                    `xkcd`,
                ]}
            />
            <h1>others</h1>
            <p>links to the other pages on this site.</p>
            <ColumnLinkWrapper>
                <ul>
                    <ListedLink key="annualreviews" to={'/annual-reviews'}>
                        annual reviews
                    </ListedLink>
                    <ListedLink key="books" to={'/books'}>
                        books
                    </ListedLink>
                    <ListedLink key="lists" to={'/lists'}>
                        lists
                    </ListedLink>
                    <ListedLink key="tags" to={'/resources'}>
                        resources & templates
                    </ListedLink>
                    <ListedLink key="tags" to={'/tags'}>
                        tags
                    </ListedLink>
                    <ListedLink key="xkcd" to={'/xkcd'}>
                        xkcd digest
                    </ListedLink>
                </ul>
            </ColumnLinkWrapper>
        </Layout>
    )
}

export default Others
