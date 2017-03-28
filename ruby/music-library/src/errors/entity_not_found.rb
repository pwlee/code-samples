module Errors
  class EntityNotFound < StandardError
    def initialize(message = "Entity not found")
      super
    end
  end
end
