# Music Library

This is a small command line application which allows the user to manage a library of artists, albums, and tracks.

## Quick Start

All you need is Ruby to run this application.

(https://www.ruby-lang.org/en/documentation/installation/)

After installing ruby and adding it to your PATH, navigate to the root of the application in a command prompt and run:

```ruby music_library.rb```

An input file containing commands can also be fed into the application by running:

```ruby music_library.rb sample_in.txt```

#### - Optional -

If you'd like to run the test suite, you'll also need RubyGems (a Ruby package management framework) and RSpec (a Ruby testing framework).

##### Installing RubyGems

(https://rubygems.org/pages/download)

* Download from the above link
* Unpack into a directory and cd there
* Install with: ```ruby setup.rb``` (you may need admin/root privilege)

##### Installing RSpec

* In a command prompt, run ```gem install rspec```
* Run the test suite by running ```rspec``` (from the root of the application)

### Questions

1. How have you gained confidence in your code?

Included in this project is a test suite (located in the "./spec" directory).  This test suite contains 48 test cases which test the application at the unit and integration level.  The unit tests ensure that the individual units which make up the application are operating correctly in isolation.  The integration tests ensure that the application's units are working together properly.

2. One of the things we'll be evaluating is how your code is organized. Why did you choose the structure that you did? What principles were important to you as you organized this code?

In addition to applying standard object oriented principles, this application implements a number of techniques outlined by the Domain Driven Design approach to constructing software.  Most notably, the main actions (E.G: Adding an artist, listening to a track, ...etc) have been encapsulated in services. As these actions represent the main use-cases of the application, the logic driving them is most subject to change.  In addition, these actions tend include a series of operations which cross the responsibility of many, many objects.  Wiring these operations straight into our entities (E.G: Track, Album, Artist) would result in high coupling and object models which perform far too much work, and this leads to an application which resists change. Instead, by encapsulating these operations in services, we get:

* A centralized location which:
  * clearly outlines the operations for our most important use-cases
  * coordinates the work between indirectly related objects (which minimizes coupling)
  * is flexible and easily accommodates changing requirements
* A file structure which documents the application (the files in the 'services' directory tells you exactly what the application does)

3. What are the performance characteristics of your implementation? Does it perform some operations faster than others? Explain any tradeoffs you made in architecting your solution.

I would classify the performance of this application as, at worst, acceptable.  Insertion and retrieval of artists, albums, and tracks are done through hash table access (which has an average running time of O(1)).  However, retrieving the top tracks and artists is not as optimized as it could be.  Rather than modeling and storing every "listen" as an object, I opted to just use a counter on the Track object.  This results in less granular access to listening behavior, but it reduces the time to determine the number of times a track was played.  Unfortunately, this still means that we have to look at every track to determine the top X tracks.  This can be sped up in a number of ways, but the first that comes to mind is create and manage an array of tracks sorted by their play count.  We would have to check to see if the sorted array needs updating every time a track is listened (increasing the running time of the "listen" action), but if "real-time" play counts aren't a requirement, then the management of the sorted array can be done asynchronously via threads or cron.
