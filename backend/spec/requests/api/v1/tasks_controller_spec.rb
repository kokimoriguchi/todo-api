require 'rails_helper'

RSpec.describe Api::V1::TasksController, type: :request do

  describe "validations" do
    it "is invalid without a title" do
      task = Task.new(title: nil)
      expect(task).to_not be_valid
      expect(task.errors[:title]).to include("can't be blank")
    end
    it "is valid with a title" do
      task = Task.new(title: "Task 1")
      expect(task).to be_valid
    end
  end

  describe "GET /api/v1/tasks" do
    it "returns HTTP status code 200" do
      get '/api/v1/tasks'
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /api/v1/tasks" do
    it "returns success JSON response" do
      post '/api/v1/tasks', params: { task: { title: "Task 1" } }
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['status']).to eq('success')
    end
  end
end
