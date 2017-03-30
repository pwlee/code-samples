require_relative './bootstrap.rb'

input_file = ARGV.first

abort 'Please enter a file name'          unless input_file
abort 'Could not find the specified file' unless File.exists?(input_file)

data_file_path = './data/store.yaml'
store = Utilities::Serializers::YAML.load(data_file_path) || Store.new
album_repository = Repositories::Albums.new(store.albums)

begin
  Utilities::Parsers::Manifest.new(input_file, store, album_repository).load
rescue Exceptions::UnrecognizedFormat => e
  puts e.message
end

Utilities::Serializers::YAML.save(data_file_path, store)
