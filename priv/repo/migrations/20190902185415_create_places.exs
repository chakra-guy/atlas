defmodule Atlas.Repo.Migrations.CreatePlaces do
  use Ecto.Migration

  def change do
    create table(:places) do
      add :name, :string
      add :rating, :float
      add :logo, :string
      add :website, :string
      add :lat, :float
      add :lng, :float

      timestamps()
    end
  end
end
