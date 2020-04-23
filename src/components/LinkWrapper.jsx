import styled from 'styled-components'
export const LinkWrapper = styled.div`
    max-width: 860px;
    padding: 1rem 1.0875rem;
    font-size: 1.5rem;
    a {
        margin-right: 15px;
    }
    a:last-of-type {
        margin-right: 0;
    }
`
export const ColumnLinkWrapper = styled(LinkWrapper)`
    display: flex;
    flex-direction: column;
    padding: 0;
    a:first-of-type {
        padding: 0;
    }
`
