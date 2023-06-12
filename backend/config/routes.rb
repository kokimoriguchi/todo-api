Rails.application.routes.draw do
  namespace :api do
    namespace :v1, format: :json do
      resources :tasks
    end
  end
  post "/sign_in", to: "sessions#create"
  resource :users, only: [:show]
end
