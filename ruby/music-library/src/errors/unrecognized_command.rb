module Errors
  class UnrecognizedCommand < StandardError
    def initialize(message = "Unrecognized command")
      super
    end
  end
end
