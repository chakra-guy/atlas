# Client

- figure out what to do with "explicit-function-return-type" rule
- add transition to map markers to make it look like it loads faster
- rewrite session/auth with proper logout and refresh
- fix warning is console

# API

- remove @default_place from PlaceController
- better index/2 route for PlaceController
- better type conversion for Places.list_places/1
- find better geo query for list_places/1
- fix CORS
- use email instead of username
- display changeset error for AtlasWeb.UserController.create/2
- signup/ for user controller, but login/ logout. ofr sesion controller?
- login/ signup/ both :create functions
- add `has_many :review, Review` ?
- compose list_reviews_by_user/place queries
- add signup/login/logout/refresh for session
