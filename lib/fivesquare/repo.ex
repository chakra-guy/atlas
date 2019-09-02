defmodule Fivesquare.Repo do
  use Ecto.Repo,
    otp_app: :fivesquare,
    adapter: Ecto.Adapters.Postgres
end
