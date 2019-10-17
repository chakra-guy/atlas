defmodule AtlasWeb.Router do
  use AtlasWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug AtlasWeb.Guardian.AuthPipeline
  end

  scope "/api", AtlasWeb do
    pipe_through :api

    post "/signup", UserController, :create
    post "/login", SessionController, :create
    post "/logout", SessionController, :delete

    # resources "/sessions", SessionController, only: [:create, :delete]
    resources "/places", PlaceController, except: [:new, :edit]
  end

  scope "/api", AtlasWeb do
    pipe_through [:api, :api_auth]

    resources "/reviews", ReviewController
  end
end
