module Views
  class Inventory
    def initialize(inventory)
      @inventory = inventory
    end

    def render
      puts "#{@inventory.format}(#{@inventory.quantity}): #{@inventory.id}"
    end
  end
end
