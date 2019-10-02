import React from "react"
import { Link } from "react-router-dom"
import { map, distinctUntilChanged } from "rxjs/operators"
import { useObservable } from "rxjs-hooks"
import { styled } from "baseui"
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavItem,
  StyledNavigationList as NavList,
} from "baseui/header-navigation"

import store$ from "../store$"

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

const view$ = store$.pipe(
  map((state: any) => state.session),
  map(({ isAuthenticated, user }: any) => ({ isAuthenticated, user })),
  distinctUntilChanged(),
)

const initialState = {
  isAuthenticated: false,
  user: {
    username: "",
  },
}

export default function Navbar() {
  const { isAuthenticated, user } = useObservable(() => view$, initialState)

  return (
    <Container>
      <NavList $align={ALIGN.left}>
        <NavItem>
          <LogoLink to="/">Atlas</LogoLink>
        </NavItem>
      </NavList>

      <NavList $align={ALIGN.center} />

      <NavList $align={ALIGN.right}>
        {isAuthenticated ? (
          <NavItem>
            <MenuLink to="/account">@{user.username}</MenuLink>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <MenuLink to="/login">Login</MenuLink>
            </NavItem>
            <NavItem>
              <MenuLink to="/signup">Signup</MenuLink>
            </NavItem>
          </>
        )}
      </NavList>
    </Container>
  )
}
