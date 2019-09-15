defmodule Fivesquare.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Fivesquare.Places.Review

  schema "users" do
    field :username, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    # has_many :review, Review

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username])
    |> validate_required([:username])
    |> validate_length(:username, min: 3, max: 20)
    |> unique_constraint(:username)
  end

  def signup_changeset(user, params) do
    user
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_required([:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Pbkdf2.hash_pwd_salt(pass))

      _ ->
        changeset
    end
  end
end
