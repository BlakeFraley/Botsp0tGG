# Botsp0tGG
Botsp0tGG is a hella dank bot I created for my buddy Jet's stream Discord server.
It also might make an appearance on some other servers that me, Jet, and our friends use while playing games. 
Features will probably start with bare simplicities with more being added as I spend more time with it.
Botsp0tGG is being written in JavaScript using MIT's Node.js run-time environment.
Thanks for giving it a shot!

-PunkRiff a.k.a. Blake

HEADS-UP: This is the STABLE version(currently v0.2.1)
It has less features than I currently have written implemented.
As of right now I'm deploying this version of the bot to stress-test the
music features. Behind the scenes, I'm working on some other features, all of which will be less intensive 
and easier to test than the music playback.
Commands:

.play <url>|<search> - Plays the given video or searches, if already a song is playing, it'll be added to
the queue

.skip [number] - Skips the current song or however many are specified by the number

.queue [index] - Displays the queue or specified item

.pause - Pauses the playback

.resume - Resumes the playback

.volume <number> - Adusts the playback volume

.leave - Leaves current voice channel

.join - Joins your current voice channel

.clearqueue - Clears the song queue