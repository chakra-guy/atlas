# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Fivesquare.Repo.insert!(%Fivesquare.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Fivesquare.Places

headers = [:name, :rating, :logo, :website, :lat, :lon]

"./fixtures/places_table.csv"
|> Path.expand(__DIR__)
|> File.stream!()
|> Stream.drop(1)
|> CSV.decode!(headers: headers)
|> Enum.each(&Places.create_place/1)
