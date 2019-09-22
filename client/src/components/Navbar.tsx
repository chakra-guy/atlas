import React from "react"
import { Link } from "react-router-dom"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavItem,
  StyledNavigationList as NavList,
} from "baseui/header-navigation"
import { styled } from "baseui"

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

const Container = styled(HeaderNavigation, {
  "padding-right": "24px",
})

const LogoLink = styled(Link, {
  color: "#000000",
  "text-decoration": "none",
  "font-weight": 500,
})

const MenuLink = styled(Link, {
  color: "#000000",
  "text-decoration": "none",
  "font-weight": 500,
})
