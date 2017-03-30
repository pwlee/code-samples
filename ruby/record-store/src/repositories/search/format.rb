require_relative 'search_field.rb'

module Repositories
  module Search
    class Format < SearchField
      def search(format)
        format = (format.is_a? String) ? format.downcase.to_sym : format
        results = []

        @albums.each do |album|
          if album.inventories.has_key?(format) && album.inventories[format].quantity > 0
            results << album
          end
        end

        results.sort! { |x,y| y.inventories[format].id <=> x.inventories[format].id }

        return results
      end
    end
  end
end
