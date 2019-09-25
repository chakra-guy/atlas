import React from "react"
import { map, distinctUntilChanged, tap } from "rxjs/operators"
import { useObservable } from "rxjs-hooks"
import { Form, Field } from "react-final-form"
import { FormControl } from "baseui/form-control"
import { Card } from "baseui/card"
import { Input, SIZE } from "baseui/input"
import { Button, KIND } from "baseui/button"

import store$, { dispatch } from "../store$"
import { login } from "../actions/loginActions"

const cardOverrides = {
  Root: {
    style: (p: any) => ({
      boxShadow: p.$theme.lighting.overlay0,
      border: 0,

      "@media screen and (min-width: 600px)": {
        width: "480px",
        margin: "auto",
      },
    }),
  },
}

const view$ = store$.pipe(
  map((state: any) => state.auth),
  distinctUntilChanged(),
  tap(() => console.log("auth changed")),
)

// FIXME
const initialState = {
  isAuthenticating: false,
  user: null,
  token: null,
}

export default function Login() {
  const { isAuthenticating } = useObservable(() => view$, initialState)

  const required = (value: string | undefined) => (value ? undefined : "Required")

  return (
    <Card title="Login" overrides={cardOverrides}>
      <Form
        onSubmit={values => dispatch(login(values))}
        render={p => (
          <form onSubmit={p.handleSubmit}>
            <Field
              name="username"
              validate={required}
              render={({ input, meta: { error, touched } }) => (
                <FormControl error={error && touched && "Required"}>
                  <Input
                    size={SIZE.large}
                    placeholder="Username"
                    error={error && touched}
                    {...input}
                  />
                </FormControl>
              )}
            />
            <Field
              name="password"
              type="password"
              validate={required}
              render={({ input, meta: { error, touched } }) => (
                <FormControl error={error && touched && "Required"}>
                  <Input
                    size={SIZE.large}
                    placeholder="Password"
                    error={error && touched}
                    {...input}
                  />
                </FormControl>
              )}
            />
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
        )}
      />
    </Card>
  )
}
