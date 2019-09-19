defmodule Atlas.Accounts do
  import Ecto.Query, warn: false
  alias Atlas.Repo

  alias Atlas.Accounts.User

  def list_users do
    Repo.all(User)
  end

  def get_user!(id) do
    Repo.get(User, id)
  end

  def get_user_by(params) do
    Repo.get_by(User, params)
  end

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  def get_user_changeset(%User{} = user) do
    User.changeset(user, %{})
  end

  def signup_user(attrs \\ %{}) do
    %User{}
    |> User.signup_changeset(attrs)
    |> Repo.insert()
  end

  def authenticate(username, password) do
    user = get_user_by(username: username)

    cond do
      user && Pbkdf2.verify_pass(password, user.password_hash) ->
        {:ok, user}

      user ->
        {:error, :not_found}

      true ->
        Pbkdf2.no_user_verify()
        {:error, :invalid_credentials}
    end
  end
end
