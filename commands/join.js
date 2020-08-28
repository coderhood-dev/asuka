module.exports = {
    name: "join",
    description: "Join this channel.",
    execute(message) {
        let voice_channel = message.member.voice.channel
        if (!voice_channel || voice_channel.type !== 'voice')
        {
            message.channel.send('You need to join a channel first!');

        } else if (message.guild.voiceConnection)
        {
            message.channel.send("I'm connected to a channel already.");
        } else 
        {
            message.channel.send('Connecting...').then(m => {
                voice_channel.join().then(() => {
                    m.edit('Connected succesfully.').catch(error => console.log(error))

                }).catch(error => console.log(error))

            }).catch(error => console.log(error))
        }
    }
}