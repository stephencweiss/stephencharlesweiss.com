import React from 'react'
import { Link } from 'gatsby'
import { space } from 'styled-system'
import styled from 'styled-components'

const StyledHeader = styled.div`
  ${space}
`

function Header(props) {
  const { title, root } = props
  const type = root ? 'h1' : 'h3'
  return (
    <StyledHeader as={type} root={root}>
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </StyledHeader>
  )
}

export default Header
