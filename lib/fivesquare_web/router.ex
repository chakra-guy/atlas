defmodule FivesquareWeb.Router do
  use FivesquareWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug FivesquareWeb.Guardian.AuthPipeline
  end

  scope "/api", FivesquareWeb do
    pipe_through :api

    post "/signup", UserController, :create
    post "/login", SessionController, :create
    post "/logout", SessionController, :delete

    # resources "/sessions", SessionController, only: [:create, :delete]
  end

  scope "/api", FivesquareWeb do
    pipe_through [:api, :api_auth]

    resources "/places", PlaceController, except: [:new, :edit]
    resources "/reviews", ReviewController
  end
end
