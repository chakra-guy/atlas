# Client

## Priority

### Features

- [ ] Finish signup page
- [ ] Add the ability to read reviews
- [ ] Add the ability to add number reviews
- [ ] Add the ability to add text reviews

### Code Quality

- [ ] Fix `.env` keys
- [ ] Rewrite session/auth with proper logout and refresh
- [ ] Fix warning is console
- [ ] Add tests
- [ ] Add proper types
- [ ] Organise styles
- [ ] Switch out mapbox-gl lib

## Non-priority

### Features

- [ ] Add transition to map markers to make it look like it loads faster
- [ ] Add loading indicator for places endpoint
- [ ] Calc distance from MapGL zoom level

### Code Quality

- [x] Figure out what to do with "explicit-function-return-type" rule
- [ ] Check my typescript config

# API

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
