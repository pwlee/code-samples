module Exceptions
  class UnrecognizedInventory < StandardError
    def initialize(msg = "Could not find that inventory ID")
      super
    end
  end
end
