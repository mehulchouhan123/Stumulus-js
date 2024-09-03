class TodosController < ApplicationController
    # Show all todos
    def index
      @todos = Todo.all
    end
  
    # Create a new todo
    def create
      @todo = Todo.new(todo_params)
      if @todo.save
        render json: @todo, status: :created
      else
        render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # Update an existing todo
    def update
      @todo = Todo.find(params[:id])
      if @todo.update(todo_params)
        render json: @todo, status: :ok
      else
        render json: { errors: @todo.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def todo_params
      params.require(:todo).permit(:title, :completed)
    end
  end
  