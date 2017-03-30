require_relative './bootstrap.rb'

inventory_id = ARGV[0]
quantity     = ARGV[1] || 1

abort 'Please enter an inventory ID' unless inventory_id

data_file_path = './data/store.yaml'
store = Utilities::Serializers::YAML.load(data_file_path) || Store.new
album_repository = Repositories::Albums.new(store.albums)

begin
  album = album_repository.search('inventory', inventory_id).first

  raise Exceptions::UnrecognizedInventory unless album

  inventory = album.purchase(inventory_id, quantity)

  puts "Removed #{quantity} #{inventory.format.to_s} of " + 
       "#{album.title} by #{album.artist} from the inventory"

rescue Exceptions::UnrecognizedInventory, Exceptions::InsufficientQuantity, Exceptions::UnrecognizedFormat => e
  puts e.message
end

Utilities::Serializers::YAML.save(data_file_path, store)
