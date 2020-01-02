# Client

## Priority

### Features

- [x] Finish signup page
- [x] Add the ability to read reviews
- [ ] Add the ability to add number reviews when authenticated
- [ ] Add the ability to add text reviews when authenticated
- [ ] Add the ability to edit/delete your own reviews when authenticated
- [x] Fix scrolling
- [x] Make map performant
- [ ] Add loading indicator for map
- [ ] Move this to `<Review />` component
- [x] Add avatars to reviews
- [ ] Add avator to navbar
- [ ] Calc distance from MapGL zoom level
- [ ] Logout
- [ ] Enable/Disabled things based on `process.env`

### Code Quality

- [ ] !!! normalize store
- [ ] Fix `.env` keys
- [ ] Rewrite session/auth with proper logout and refresh
- [x] Fix warning is console
- [ ] Add proper types
- [ ] Organise styles
- [x] Switch out mapbox-gl lib
- [ ] Use more generic default values (example: geo)
- [ ] Add tests

#### Other

- [ ] Add github actions for unit-testing react app
- [ ] Add github actions for unit-testing elixir api

## Non-priority

### Features

- [x] Add transition to map markers to make it look like it loads faster
- [ ] Add `search for Place or location` functionality to map
- [ ] Style marker on map

### Code Quality

- [ ] Add constant for action types
- [x] Figure out what to do with "explicit-function-return-type" rule
- [ ] Check my typescript config
- [ ] Add proper error handling/error messages
- [ ] Go through fixmes/todos and add them here

# API

- [ ] Go through fixmes/todos and add them here
- [ ] Add proper error handling/error messages
- [x] formalize to `lng/lat`
- [ ] remove @default_place from PlaceController
- [ ] better index/2 route for PlaceController
- [ ] better type conversion for Places.list_places/1
- [ ] find better geo query for list_places/1
- [ ] fix CORS
- [ ] use email instead of username
- [ ] display changeset error for AtlasWeb.UserController.create/2
- [ ] signup/ for user controller, but login/ logout. ofr sesion controller?
- [ ] login/ signup/ both :create functions
- [ ] add `has_many :review, Review` ?
- [ ] compose list_reviews_by_user/place queries
- [ ] add signup/login/logout/refresh for session
- [ ] add SSL
- [ ] Use prod.secret.exs and environment variables properly

# For youtube

## Client

- testing
- typescript
- RxJs Store
- WebUI/CSS-in-JS
- Mapbox
- Auth/react-hook-form
- custom layouts -> architecture case-study

## API

- testing
- auth
- docker
- postGIS
- mocking DB
