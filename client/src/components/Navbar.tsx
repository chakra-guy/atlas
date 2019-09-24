import React from "react"
import { Link } from "react-router-dom"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavItem,
  StyledNavigationList as NavList,
} from "baseui/header-navigation"
import { styled } from "baseui"

const Container = styled(HeaderNavigation, p => ({
  paddingRight: p.$theme.sizing.scale800,
}))

const LogoLink = styled(Link, p => ({
  ...p.$theme.typography.font550,
  textDecoration: "none",
  color: p.$theme.colors.mono1000,
  ":hover": {
    color: p.$theme.colors.accent,
  },
}))

const MenuLink = styled(Link, p => ({
  ...p.$theme.typography.font450,
  textDecoration: "none",
  color: p.$theme.colors.mono1000,
  ":hover": {
    color: p.$theme.colors.accent,
  },
}))

export default function Navbar() {
  return (
    <Container>
      <NavList $align={ALIGN.left}>
        <NavItem>
          <LogoLink to="/">Atlas</LogoLink>
        </NavItem>
      </NavList>

      <NavList $align={ALIGN.center} />

      <NavList $align={ALIGN.right}>
        <NavItem>
          <MenuLink to="/private">Private</MenuLink>
        </NavItem>
        <NavItem>
          <MenuLink to="/login">Login</MenuLink>
        </NavItem>
        <NavItem>
          <MenuLink to="/signup">Signup</MenuLink>
        </NavItem>
      </NavList>
    </Container>
  )
}
