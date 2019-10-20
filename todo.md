# Client

## Priority

### Features

- [x] Finish signup page
- [ ] Add the ability to read reviews
- [ ] Add the ability to add number reviews
- [ ] Add the ability to add text reviews
- [x] Fix scrolling
- [x] Make map performant

### Code Quality

- [ ] Fix `.env` keys
- [ ] Rewrite session/auth with proper logout and refresh
- [ ] Fix warning is console
- [ ] Add tests
- [ ] Add proper types
- [ ] Organise styles
- [x] Switch out mapbox-gl lib

## Non-priority

### Features

- [x] Add transition to map markers to make it look like it loads faster
- [ ] Add loading indicator for the map
- [ ] Calc distance from MapGL zoom level
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
- [ ] formalize to `lng/lat`
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
