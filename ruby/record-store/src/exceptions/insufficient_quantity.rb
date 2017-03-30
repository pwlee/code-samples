module Exceptions
  class InsufficientQuantity < StandardError
    def initialize(msg = "Insufficient quantity")
      super
    end
  end
end
