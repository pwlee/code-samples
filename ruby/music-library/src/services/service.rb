module Services
  class Service
    @data_store = nil

    def initialize(data_store)
      @data_store = data_store
    end
  end
end
