defmodule FivesquareWeb.Router do
  use FivesquareWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", FivesquareWeb do
    pipe_through :api

    resources "/places", PlaceController, except: [:new, :edit]
  end
end
