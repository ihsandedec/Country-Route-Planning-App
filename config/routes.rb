Rails.application.routes.draw do
  get "static_pages/index"
  namespace :api do
    post "routes", to: "routes#create"
    get 'countries', to: 'countries#index'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "static_pages#index"
end
