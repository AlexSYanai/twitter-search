Rails.application.routes.draw do
  resources :twitter
  root 'twitter#index'
end
