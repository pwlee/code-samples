# Simple key-value pair storage with put & get interface.
# Key-Value pairs are partitioned into data sets so that
# a single identity map can accomodate multiple entities.
#
# E.G:
#   {
#     albums : { album_1: <Album>, album_2: <Album> },
#     tracks : { track_1: <Track>, track_2: <Track> },
#   }

module Utilities
  class IdentityMap
    @storage = nil

    def initialize
      @storage = {}
    end

    def get(data_set_key, key)
      data_set_key, key = data_set_key.downcase, key = key.downcase

      object = @storage[data_set_key][key] rescue raise_not_found(data_set_key, key)
      raise_not_found(data_set_key, key) unless object

      object
    end

    def put(data_set_key, key, value)
      data_set_key, key = data_set_key.downcase, key = key.downcase

      @storage[data_set_key] = {} unless @storage.key? data_set_key
      @storage[data_set_key][key] = value
      @storage[data_set_key][key]
    end

    def all(data_set_key)
      @storage[data_set_key.downcase]
    end

    private

    def raise_not_found(data_set_key, key)
      raise Errors::EntityNotFound.new("Couldn't find #{data_set_key}: '#{key}'")
    end
  end
end
