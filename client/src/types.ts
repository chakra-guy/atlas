import { Observable } from "rxjs"

// App types

export type Place = {
  id: number
  name: string
  lat: number
  lon: number
  logo: string
  rating: number
  website: string
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
