import React from "react"
import { pluck, distinctUntilChanged } from "rxjs/operators"
import { useObservable } from "rxjs-hooks"
import useForm from "react-hook-form"
import { Redirect } from "react-router"
import { FormControl } from "baseui/form-control"
import { Card } from "baseui/card"
import { Input } from "baseui/input"
import { Button, KIND, SIZE } from "baseui/button"

import store$ from "../store$"
import { dispatch } from "../action$"
import { Credentials } from "../types"
import { signup } from "../actions/session"

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
}

export default function Signup(): JSX.Element {
  const { isAuthenticated, isAuthenticating } = useObservable(() => view$, initialValues)

  const { register, handleSubmit, errors } = useForm<Credentials>()

  const submit = (values: Credentials) => dispatch(signup(values))

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Card title="Signup" overrides={cardOverrides}>
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
          Sign up
        </Button>
      </form>
    </Card>
  )
}
