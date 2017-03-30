require_relative 'search_field.rb'

module Repositories
  module Search
    class ReleaseYear < SearchField
      def search(release_year)
        results = []

        @albums.each do |album|
          if album.release_year.to_s.match(/#{release_year}/i)
            results << album
          end
        end

        results.sort! { |x,y| y.release_year <=> x.release_year }

        return results
      end
    end
  end
end
