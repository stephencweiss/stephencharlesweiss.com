import React from 'react'
import { PostDetails, PostTitleLink } from '.'
import { getBlurb } from '../utils'
import styled from 'styled-components'

const ContentWrapper = styled.div`
    padding-bottom: 1.5em;
    :last-of-type {
        padding-bottom: 0em;
    }
`

export function BlogExcerpt({ node }) {
    const { title } = node.frontmatter
    const { listDate, slug, readingTime } = node.fields
    const { words: wordCount, text: estimate } = readingTime
    const { excerpt } = node
    return (
        <ContentWrapper>
            <PostTitleLink slug={slug} title={title} />
            <PostDetails
                data={listDate}
                estimate={estimate}
                wordCount={wordCount}
            />
            {getBlurb({ content: excerpt, path: slug })}
        </ContentWrapper>
    )
}
