import React from "react"
import { Redirect } from "react-router-dom"
import { pluck, distinctUntilChanged } from "rxjs/operators"
import { useObservable } from "rxjs-hooks"
import useForm from "react-hook-form"
import { FormControl } from "baseui/form-control"
import { Card } from "baseui/card"
import { Input, SIZE } from "baseui/input"
import { Button, KIND } from "baseui/button"
import { Toast, KIND as TOAST_KIND } from "baseui/toast"

import store$ from "../store$"
import { dispatch } from "../action$"
import { login } from "../actions/session"
import { Credentials } from "../types"

const cardOverrides = {
  Root: {
    style: (p: any) => ({
      boxShadow: p.$theme.lighting.overlay0,
      borderWidth: 0,

      "@media screen and (min-width: 600px)": {
        paddingTop: p.$theme.sizing.scale900,
        width: "480px",
        margin: "auto",
      },
    }),
  },
}

const view$ = store$.pipe(
  pluck("session"),
  distinctUntilChanged(),
)

const initialValues = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
  token: null,
  error: null,
}

export default function Login() {
  const { isAuthenticated, isAuthenticating, error } = useObservable(() => view$, initialValues)

  const { register, handleSubmit, errors } = useForm<Credentials>()

  const submit = (values: Credentials) => dispatch(login(values))

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Card title="Login" overrides={cardOverrides}>
      {error && <Toast kind={TOAST_KIND.negative}>{error}</Toast>}

      <form onSubmit={handleSubmit(submit)}>
        <FormControl error={errors.username && "Required"}>
          <Input
            name="username"
            size={SIZE.large}
            placeholder="Username"
            error={!!errors.username}
            inputRef={register({ required: true })}
          />
        </FormControl>

        <FormControl error={errors.password && "Required"}>
          <Input
            name="password"
            type="password"
            size={SIZE.large}
            placeholder="Password"
            error={!!errors.password}
            inputRef={register({ required: true })}
          />
        </FormControl>

        <Button
          type="submit"
          isLoading={isAuthenticating}
          disabled={isAuthenticating}
          kind={KIND.primary}
          endEnhancer={<span>→</span>}
        >
          Log in
        </Button>
      </form>
    </Card>
  )
}
