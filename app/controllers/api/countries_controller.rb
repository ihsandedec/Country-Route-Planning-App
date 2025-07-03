class Api::CountriesController < ApplicationController
  def index
    begin
      countries = Country.all.order(:name)
      
      country_data = countries.map do |country|
        {
          code: country.code,
          name: country.name,
          latitude: country.latitude,
          longitude: country.longitude
        }
      end
      
      render json: country_data
    rescue => e
      Rails.logger.error "Countries API error: #{e.message}"
      render json: { error: 'Ülke verileri yüklenemedi' }, status: :internal_server_error
    end
  end
end