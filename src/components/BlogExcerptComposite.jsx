import React from 'react'
import { PostTitleLink, PostDate } from '.'
import { getBlurb } from '../utils'
import styled from 'styled-components'

const ContentWrapper = styled.div`
    padding-bottom: 1.5em;
    :last-of-type{
        padding-bottom:0em;
    }
`

export function EntryCard({ node }) {
    const { title } = node.frontmatter
    const { listDate, slug } = node.fields
    const { excerpt } = node
    return (
        <ContentWrapper>
            <PostTitleLink slug={slug} title={title} />
            <PostDate>{listDate}</PostDate>
            {getBlurb({ content: excerpt, path: slug })}
        </ContentWrapper>
    )
}
