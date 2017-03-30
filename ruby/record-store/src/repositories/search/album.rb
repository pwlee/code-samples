require_relative 'search_field.rb'

module Repositories
  module Search
    class Album < SearchField
      def search(title)
        results = []

        @albums.each do |album|
          if album.title.match(/#{title}/i)
            results << album
          end
        end

        results.sort! { |x,y| x.title <=> y.title }

        return results
      end
    end
  end
end
