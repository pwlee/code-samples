# Record Store
Created by Peter Lee for SYPartners

## Quickstart
Three commands are available and are executed by running the following scripts:

##### Load Inventory
```ruby load_inventory.rb <path_to_manifest_file>```

##### Search
```ruby search_inventory.rb <[artist|album|format|released]> <search_term>```

##### Purchase
```ruby purchase.rb <inventory_id>```

## Design Overview

##### Model Breakdown
The record store is modeled using three main objects (./src/models/): Store, Album, AlbumInventory.  This modeling can be expressed as: "a Store has many Albums, and an Album has many inventories."  E.G:

* Store
  * album
    * cd inventory
    * tape inventory
  * album
    * cd inventory
  * album
    * vinyl inventory

##### Data Persistence
Data persistence is accomplished through the use of Ruby's native YAML library.  Ruby objects are loaded from and written to a file (./data/store.yaml).

##### Data Access
After the serialized Store model is loaded into memory, the application accesses albums through a repository (./src/repositories/albums.rb).  This repository specifies the interface in which albums are retrieved.

##### Album Search and Manifest Parsing
Album search and manifest parsing are processes which vary slightly based on some determining criteria (search ordering varies by search field, and manifest parsing varies by file extension).  The behavior of these variations has been extracted out into strategy objects (./src/utilities/parsers/ and ./src/repositories/search/).

Factories create and return the appropriate strategy based on the determining criteria (search field and file extension). This allows the application to switch between parsing/searching strategies in an extensible manner.  When a new strategy is required, create the strategy object and update the factory.

##### Views
In order to ensure a clean separation between business logic and view logic, output to the console has been separated out into view objects (./src/views/) where appropriate.  These view objects are responsible for rendering the output for their specified models.
