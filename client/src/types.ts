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

// Prototype types

export type ActionType = string

export type Action<TPayload> = {
  type: ActionType
} & TPayload

export type SomePayload = {
  [key: string]: any
}

export type ActionShape = Action<SomePayload>

export type Action$ = Observable<ActionShape>
