module Utilities
  module Parsers
    class Factory
      def self.get(extension)

        case extension.downcase
        when '.csv'
          return Utilities::Parsers::CSV.new
        when '.pipe'
          return Utilities::Parsers::Pipe.new
        end
        
        raise Exceptions::UnrecognizedFormat
      end
    end
  end
end
