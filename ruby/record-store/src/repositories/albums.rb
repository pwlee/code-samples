module Repositories
  class Albums
    def initialize(albums)
      @albums = albums
    end

    def find(title)
      @albums.each do |album|
        if album.title.casecmp(title) == 0
          return album
        end
      end

      return nil
    end

    def search(field, value)
      return Repositories::Search::Factory.get(@albums, field).search(value)
    end
  end
end
