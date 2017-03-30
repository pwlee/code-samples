module Utilities
  module Parsers
    class CSV
      def parse(line)
        parts = line.scan(/(".*?"|[^",]+)(?=\s*,|\s*$)/)
        parts = parts.map { |i| Utilities::String.clean i[0] }

        raise Exceptions::MalformedEntry unless parts.size == 4

        return {
          artist: parts[0],
          title:  parts[1],
          format: parts[2],
          release_year: parts[3].to_i,
          quantity: 1
        }
      end
    end
  end
end
