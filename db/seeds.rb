# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Country.find_or_create_by(code: "TR") do |country|
  country.name = "Türkiye"
  country.latitude = 39.93
  country.longitude = 32.86
end

Country.find_or_create_by(code: "BG") do |country|
  country.name = "Bulgaristan"
  country.latitude = 42.70
  country.longitude = 23.32
end

Country.find_or_create_by(code: "RS") do |country|
  country.name = "Sırbistan"
  country.latitude = 44.78
  country.longitude = 20.45
end

Country.find_or_create_by(code: "HR") do |country|
  country.name = "Hırvatistan"
  country.latitude = 45.81
  country.longitude = 15.98
end

Country.find_or_create_by(code: "SI") do |country|
  country.name = "Slovenya"
  country.latitude = 46.05
  country.longitude = 14.51
end

Country.find_or_create_by(code: "AT") do |country|
  country.name = "Avusturya"
  country.latitude = 48.21
  country.longitude = 16.37
end

Country.find_or_create_by(code: "DE") do |country|
  country.name = "Almanya"
  country.latitude = 52.52
  country.longitude = 13.40
end
