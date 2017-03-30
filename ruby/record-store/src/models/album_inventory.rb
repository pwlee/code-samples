require 'SecureRandom'

class AlbumInventory
  attr_accessor :id, :format, :quantity

  def initialize(format, quantity = 0)
    @id = SecureRandom.uuid
    @format = format
    @quantity = quantity.to_i
  end
end
