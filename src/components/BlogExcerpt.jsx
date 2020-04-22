import React from 'react'
import { PostTitleLink, PostDate } from '.'
import { getBlurb } from '../utils'
import styled from 'styled-components'

const ContentWrapper = styled.div`
    padding-bottom: 1.5em;
    :last-of-type {
        padding-bottom: 0em;
    }
`

export const PostDetails = styled.h5`
    display: inline;
    color: #606060;
`

export const DetailsWrapper = styled.div`
    margin: 0.5rem 0 0;
`

export function BlogExcerpt({ node }) {
    const { title } = node.frontmatter
    const { listDate, slug, readingTime } = node.fields
    const { words, text } = readingTime
    const { excerpt } = node
    return (
        <ContentWrapper>
            <PostTitleLink slug={slug} title={title} />
            <DetailsWrapper>
                <PostDetails>{listDate}</PostDetails>&nbsp;|&nbsp;
                <PostDetails>
                    {text}, {words} words
                </PostDetails>
            </DetailsWrapper>
            {getBlurb({ content: excerpt, path: slug })}
        </ContentWrapper>
    )
}
