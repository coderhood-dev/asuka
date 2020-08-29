const ytdl = require('ytdl-core');

module.exports = {
    name: "play",
    description: "Plays a song into a VC.",
    execute(message, args) {
        let voice_channel = message.member.voice.channel

        if (!voice_channel) return message.channel.send('You need to join a VC first! Use /asuka join to join me!');
        if (!args.join(' ')) return message.channel.send('Insert a YouTube URL to play a song.');

        voice_channel.join()
            .then(connection => {
                const url = ytdl(args.join(' '), { filter: 'audioonly' });
                const dispatcher = connection.play(url);

                message.channel.send('Playing now: ' + args.join(' '));

            }).catch(console.error);
    }
}