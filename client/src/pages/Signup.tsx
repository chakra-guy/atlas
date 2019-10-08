import React, { useState, FormEvent } from "react"
import { FormControl } from "baseui/form-control"
import { Card } from "baseui/card"
import { Input } from "baseui/input"
import { Button, KIND } from "baseui/button"

export default function Signup(): JSX.Element {
  const [loginValue, setLoginValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("submitted")
  }

  return (
    <Card title="Signup">
      <form onSubmit={handleSubmit}>
        <FormControl label="username">
          <Input
            id="login-input"
            value={loginValue}
            onChange={e => setLoginValue(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl label="password">
          <Input
            id="password-input"
            type="password"
            value={passwordValue}
            onChange={e => setPasswordValue(e.currentTarget.value)}
          />
        </FormControl>
        <Button type="submit" kind={KIND.primary}>
          Sign up
        </Button>
      </form>
    </Card>
  )
}
