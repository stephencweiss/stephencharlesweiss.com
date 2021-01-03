import React from 'react'
import { Item, ItemBlurb, ItemHighlight, ListItem } from './Search.styled'

import { PostTitleLink } from '../index'

function SearchResult({ page, blurb }) {
    return (
        <ListItem key={page.id}>
            <Item>
                <PostTitleLink slug={`/${page.slug}`} title={page.title} />
                <ItemHighlight>
                    {page.publish && `Published: ${page.publish}`}
                </ItemHighlight>
                <ItemHighlight>
                    {!page.publish && page.date && `Date: ${page.date}`}
                </ItemHighlight>
                <ItemHighlight>
                    {page.updated && `Upated: ${page.updated}`}
                </ItemHighlight>
                <ItemHighlight>
                    {page.tags && ' Tags: ' + page.tags.join(`, `)}
                </ItemHighlight>
                <ItemBlurb>{blurb && blurb}</ItemBlurb>
            </Item>
        </ListItem>
    )
}

export default SearchResult
