module Utilities
  class String
    def self.clean(input)
      return input.gsub(/["]/, '').strip
    end
  end
end
