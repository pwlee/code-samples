module Views
  class Albums
    def initialize(albums)
      @albums = albums
    end

    def render
      @albums.each do |album|
        Views::Album.new(album).render

        puts ""
      end
    end
  end
end
