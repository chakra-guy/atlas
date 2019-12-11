import React from "react"
import { Avatar } from "baseui/avatar"
import { StarRating } from "baseui/rating"
import { styled } from "baseui"

import { ReviewType } from "../types"

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
})

const Username = styled("div", {
  flex: 1,
  marginLeft: "12px",
})

const DisablePointerEvents = styled("div", {
  pointerEvents: "none",
})

const Text = styled("div", p => ({
  ...p.$theme.typography.font200,
  paddingTop: p.$theme.sizing.scale300,
  paddingBottom: p.$theme.sizing.scale800,
}))

const RatingOverrides = {
  Root: {
    style: {
      transform: "translateX(24px) scale(0.8)",
    },
  },
}

type Props = ReviewType

export default function Review(props: Props): JSX.Element {
  const { user, text, rating } = props

  return (
    <div>
      <Container>
        <Avatar
          name={user.username}
          size="scale1000"
          src={`https://api.adorable.io/avatars/285/${user.id}@adorable.io.png`}
        />
        <Username>{user.username}</Username>
        <DisablePointerEvents>
          <StarRating numItems={5} value={rating} overrides={RatingOverrides} />
        </DisablePointerEvents>
      </Container>
      <Text>{text}</Text>
    </div>
  )
}
