Rails.application.routes.draw do
  resources :quotes
  resources :tasks 
  get 'search', to: 'tasks#search'
  resources :todos, only: [:index, :create, :update]
  root 'tasks#index'
end
