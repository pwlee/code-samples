module Exceptions
  class UnrecognizedField < StandardError
    def initialize(msg = "Encountered unrecognized search field")
      super
    end
  end
end
