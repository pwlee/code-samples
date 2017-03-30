require 'yaml'

Dir["./src/**/*.rb"].each { |file| require file }

data_directory = './data/'
data_file = 'store.yaml'
data_file_path = data_directory + data_file

Dir.mkdir data_directory unless Dir.exists? data_directory

File.open(data_file_path, "a+") {}
