import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { space } from 'styled-system'
import styled from 'styled-components'
import { Toggle } from '.'

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

const HeaderContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

function Header(props) {
  const { darkMode, root, title } = props
  const type = root ? 'h1' : 'h3'
    console.log(`Header --> `, {darkMode})
  return (
    <HeaderContainer>
      <StyledHeader as={type} root={root}>
        <Link to={`/`}>{title}</Link>
      </StyledHeader>
      <Toggle darkMode={darkMode} />
    </HeaderContainer>
  )
}

export default Header
