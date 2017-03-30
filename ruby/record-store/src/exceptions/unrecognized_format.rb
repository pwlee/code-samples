module Exceptions
  class UnrecognizedFormat < StandardError
    def initialize(msg = "Encountered unrecognized format")
      super
    end
  end
end
