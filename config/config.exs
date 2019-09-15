# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :fivesquare,
  ecto_repos: [Fivesquare.Repo]

# Configures the endpoint
config :fivesquare, FivesquareWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Cc7+dKfUPFv2HrQa5e54aEoYlCMT++zObdtujtGNBgxcaq/gSWSBOOeI1wMYistQ",
  render_errors: [view: FivesquareWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: Fivesquare.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :fivesquare, FivesquareWeb.Guardian,
  issuer: "fivesquare",
  secret_key: "Jl30rzrYMklaDTet6t/Oxfn7v95/2QBgqoHMVP/1P7FSPKelyfWD/e71fIhcQSd8"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
