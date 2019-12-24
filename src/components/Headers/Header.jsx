import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { space } from 'styled-system'
import styled from 'styled-components'

const StyledHeader = styled.div`
  ${space}
  margin: 0;
  padding-top: ${({ root }) => (root ? '1.5em' : '1em')};
`

const Link = styled(GatsbyLink)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;

  &:focus-within {
    text-decoration: underline;
  }
`

function Header(props) {
  const { title, root } = props
  const type = root ? 'h1' : 'h3'

  return (
    <StyledHeader as={type} root={root}>
      <Link to={`/`}>{title}</Link>
    </StyledHeader>
  )
}

export default Header
