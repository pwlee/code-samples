require_relative './bootstrap.rb'

search_field = ARGV[0]
search_term  = ARGV[1]

abort 'Please enter a search field' unless search_field
abort 'Please enter a search term'  unless search_term

data_file_path = './data/store.yaml'
store = Utilities::Serializers::YAML.load(data_file_path) || Store.new
album_repository = Repositories::Albums.new(store.albums)

begin
  albums = album_repository.search(search_field, search_term)
  Views::Albums.new(albums).render
rescue Exceptions::UnrecognizedField => e
  puts e.message
  puts "Avalailable search fields are: album, artist, format, released"
end
