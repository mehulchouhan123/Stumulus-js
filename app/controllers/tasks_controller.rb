class TasksController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @tasks = Task.order(created_at: :desc)
    @task = Task.new
  end

  def create
    @tasks = Task.new(task_params)
    if @tasks.save
      respond_to do |format|
        format.html { render partial: 'task', locals: { tasks: [@tasks] } }
      end
    else
      respond_to do |format|
        format.html { render :index }
        format.js  
      end
    end
  end

  def edit
    @task = Task.find(params[:id])
  end

  def update
    @task = Task.find(params[:id])
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to tasks_url, notice: "Task was successfully updated" }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @task = Task.find(params[:id])
    debugger
    if @task.destroy
      head :no_content
    else
      render json: { error: 'Failed to delete task' }, status: :unprocessable_entity
    end
  end

  def search
    @tasks = if params[:query].present?
                Task.where('description LIKE ?', "%#{params[:query]}%")
              else
                Task.all
              end
    respond_to do |format|
      format.html { render partial: 'task', locals: { tasks: @tasks } }
    end
  end

  private

  def task_params
    params.require(:task).permit(:description)
  end
end
