module Views
  class Album
    def initialize(album)
      @album = album
    end

    def render
      puts "Artist: #{@album.artist}"
      puts "Album: #{@album.title}"
      puts "Released: #{@album.release_year}"

      Views::Inventories.new(@album.inventories).render
    end
  end
end
