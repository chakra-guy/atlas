defmodule Fivesquare.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :rating, :integer
      add :text, :string
      add :image_url, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :place_id, references(:places, on_delete: :nothing)

      timestamps()
    end

    create index(:reviews, [:user_id])
    create index(:reviews, [:place_id])
  end
end
