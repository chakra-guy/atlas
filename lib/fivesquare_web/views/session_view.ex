defmodule FivesquareWeb.SessionView do
  use FivesquareWeb, :view

  def render("show.json", %{jwt: jwt, user: user}) do
    %{jwt: jwt, username: user.username}
  end

  def render("error.json", _params) do
    %{error: "Invalid email/password"}
  end

  def render("delete.json", _params) do
    %{ok: true}
  end
end
