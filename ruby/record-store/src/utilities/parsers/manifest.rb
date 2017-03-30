module Utilities
  module Parsers
    class Manifest
      def initialize(file_path, store, album_repository)
        @file_path = file_path
        @line_parser = Utilities::Parsers::Factory.get(File.extname(@file_path))
        @store = store
        @album_repository = album_repository
      end

      def load
        File.readlines(@file_path).each do |line|
          results = @line_parser.parse(line)

          begin
            # Check to see if the album already exists in the store
            album = @album_repository.find(results[:title])

            # If it doesn't, create a new album and add it to the store
            if !album
              album = Album.new(results[:artist], results[:title], results[:release_year])
              @store.albums << album
            end

            album.add_inventory(results[:format].downcase.to_sym, results[:quantity])

          rescue Exceptions::MalformedEntry => e
            puts e.message
          end
        end
      end

    end
  end
end
