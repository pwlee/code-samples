module Exceptions
  class MalformedEntry < StandardError
    def initialize(msg = "Encountered malformed entry")
      super
    end
  end
end
