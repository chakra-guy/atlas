import React, { useState } from "react"
import { FormControl } from "baseui/form-control"
import { Card } from "baseui/card"
import { Input } from "baseui/input"
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

export default function Login() {
  const [loginValue, setLoginValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    console.log("submitted")
  }

  return (
    <Card title="Login" overrides={cardOverrides}>
      <form onSubmit={handleSubmit}>
        <FormControl label="Username">
          <Input
            id="login-input"
            value={loginValue}
            onChange={e => setLoginValue(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl label="Password">
          <Input
            id="password-input"
            type="password"
            value={passwordValue}
            onChange={e => setPasswordValue(e.currentTarget.value)}
          />
        </FormControl>
        <Button type="submit" kind={KIND.primary}>
          Log in
        </Button>
      </form>
    </Card>
  )
}
