describe MusicLibrary do
  it "catalogs artists, albums, and tracks" do
    music_library = MusicLibrary.new

    artist  = music_library.execute('add artist "Foo Bar"')
    album_1 = music_library.execute('add album "Fizz Buzz" by "Foo Bar"')
    album_2 = music_library.execute('add album "Mizz Muzz" by "Foo Bar"')
    track_1 = music_library.execute('add track "Herp Derp" on "Fizz Buzz" by "Foo Bar"')
    track_2 = music_library.execute('add track "Nerp Terp" on "Fizz Buzz" by "Foo Bar"')

    albums = music_library.execute('list albums by "Foo Bar"')
    expect(albums).to eq [album_1, album_2]

    tracks = music_library.execute('list tracks on "Fizz Buzz" by "Foo Bar"')
    expect(tracks).to eq [track_1, track_2]
  end

  it "keeps track of most played artists and tracks" do
    music_library = MusicLibrary.new

    artist_1  = music_library.execute('add artist "Foo Bar"')
    artist_2  = music_library.execute('add artist "Roo Tar"')
    album_1 = music_library.execute('add album "Fizz Buzz" by "Foo Bar"')
    album_2 = music_library.execute('add album "Nizz Nuzz" by "Foo Bar"')
    album_3 = music_library.execute('add album "Wizz Wuzz" by "Roo Tar"')
    track_1 = music_library.execute('add track "Herp Derp" on "Fizz Buzz" by "Foo Bar"')
    track_2 = music_library.execute('add track "Merp Kerp" on "Fizz Buzz" by "Foo Bar"')
    track_3 = music_library.execute('add track "Terp Zerp" on "Wizz Wuzz" by "Roo Tar"')

    25.times { music_library.execute('listen to "Herp Derp" on "Fizz Buzz" by "Foo Bar"') }
    15.times { music_library.execute('listen to "Merp Kerp" on "Fizz Buzz" by "Foo Bar"') }
    51.times { music_library.execute('listen to "Terp Zerp" on "Wizz Wuzz" by "Roo Tar"') }

    top_tracks = music_library.execute('list top 2 tracks"')
    expect(top_tracks).to eq [track_3, track_1]

    top_artists = music_library.execute('list top 2 artists"')
    expect(top_artists).to eq [artist_2, artist_1]
  end
end
