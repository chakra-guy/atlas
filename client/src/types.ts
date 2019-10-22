import { Observable } from "rxjs"

export type User = {
  id: number
  username: string
}

export type Credentials = {
  username: string
  password: string
}

export type Review = {
  id: number
  image_url?: string
  place_id: number
  user_id: number
  rating: number
  text: string
}

export type Place = {
  id: number
  name: string
  lat: number
  lon: number
  logo: string
  rating: number
  website: string
  reviews: Review[]
}

export type Geo = {
  lat: number
  lon: number
}

export type mapState = {
  geo: Geo
  distance: number
}

export type placeState = {
  places: Place[]
}

export type sessionState = {
  isAuthenticated: boolean
  isAuthenticating: boolean
  user?: User
  token?: string
  error?: string
}

export type ActionType = string

export type Action<TPayload> = {
  type: ActionType
} & TPayload

export type Payload = {
  [key: string]: any
}

export type ActionShape = Action<Payload>

export type Action$ = Observable<ActionShape>
