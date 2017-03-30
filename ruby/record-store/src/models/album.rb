class Album
  attr_accessor :artist, :title, :release_year, :inventories

  def initialize(artist = nil, title = nil, release_year = nil)
    @artist = artist
    @title = title
    @release_year = release_year
    @inventories = {}
  end

  def add_inventory(format, quantity)
    validate_format format
    @inventories[format].quantity += quantity.to_i
  end

  def remove_inventory(format, quantity)
    validate_format format
    @inventories[format].quantity -= quantity.to_i
  end

  def purchase(inventory_id, quantity)
    inventory = find_inventory(inventory_id)

    raise InsufficientQuantity if inventory.quantity - quantity < 0

    remove_inventory(inventory.format, quantity)

    @inventories.delete(inventory.format) if inventory.quantity <= 0

    return inventory
  end

  private

  def validate_format(format)
    raise Exceptions::UnrecognizedFormat unless [:cd, :vinyl, :tape].include? format

    if !@inventories.has_key? format
      @inventories[format] = AlbumInventory.new(format, 0)
    end
  end

  def find_inventory(inventory_id)
    @inventories.each do |format, inventory|
      if inventory.id.casecmp(inventory_id) == 0
        return inventory
      end
    end

    return nil
  end
end
