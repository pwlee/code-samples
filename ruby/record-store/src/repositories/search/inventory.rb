require_relative 'search_field.rb'

module Repositories
  module Search
    class Inventory < SearchField
      def search(inventory_id)
        results = []

        @albums.each do |album|
          album.inventories.each do |key, album_inventory|
            if album_inventory.id.casecmp(inventory_id) == 0
              results << album
            end
          end
        end

        return results
      end
    end
  end
end
