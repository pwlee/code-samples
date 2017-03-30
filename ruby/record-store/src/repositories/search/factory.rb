module Repositories
  module Search
    class Factory
      def self.get(albums, field)
        case field.downcase
        when 'album'
          return Repositories::Search::Album.new(albums)
        when 'artist'
          return Repositories::Search::Artist.new(albums)
        when 'format'
          return Repositories::Search::Format.new(albums)
        when 'released'
          return Repositories::Search::ReleaseYear.new(albums)
        when 'inventory'
          return Repositories::Search::Inventory.new(albums)
        end

        raise Exceptions::UnrecognizedField
      end
    end
  end
end
