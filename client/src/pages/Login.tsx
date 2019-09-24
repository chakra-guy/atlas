import React from "react"
import { Form, Field } from "react-final-form"
import { FormControl } from "baseui/form-control"
import { Card } from "baseui/card"
import { Input, SIZE } from "baseui/input"
import { Button, KIND } from "baseui/button"

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

interface FormValues {
  username: string
  password: string
}

export default function Login() {
  const handleSubmit = (values: FormValues) => {
    console.log("submitted", values)
  }

  const required = (value: string | undefined) => (value ? undefined : "Required")

  return (
    <Card title="Login" overrides={cardOverrides}>
      <Form
        onSubmit={handleSubmit}
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
            <Button type="submit" kind={KIND.primary}>
              Log in
            </Button>
          </form>
        )}
      />
    </Card>
  )
}
