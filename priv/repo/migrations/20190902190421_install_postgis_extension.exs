defmodule Fivesquare.Repo.Migrations.InstallPostgisExtension do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION postgis")
  end
end
