module Utilities
  module Parsers
    class Pipe
      def parse(line)
        parts = line.split("|")
        parts = parts.map { |i| Utilities::String.clean i }

        raise Exceptions::MalformedEntry unless parts.size == 5

        return {
          quantity: parts[0].to_i,
          format: parts[1],
          release_year: parts[2].to_i,
          artist: parts[3],
          title: parts[4]
        }
      end
    end
  end
end
