require_relative 'search_field.rb'

module Repositories
  module Search
    class Artist < SearchField
      def search(artist)
        results = []

        @albums.each do |album|
          if album.artist.match(/#{artist}/i)
            results << album
          end
        end

        results.sort! { |x,y| x.artist <=> y.artist }

        return results
      end
    end
  end
end
