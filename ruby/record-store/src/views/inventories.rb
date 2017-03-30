module Views
  class Inventories
    def initialize(inventories)
      @inventories = inventories
    end

    def render
      @inventories.each do |key, inventory|
        Views::Inventory.new(inventory).render
      end
    end
  end
end
