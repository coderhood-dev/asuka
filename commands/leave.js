module.exports = {
    name: "leave",
    description: "Leave this channel.",
    execute(message) {
        let voice_channel = message.member.voice.channel
        if (!voice_channel) {
            message.channel.send("You aren't connected to a voice channel.");
        } else {
            message.channel.send("Leaving this voice channel.").then(() => {
                voice_channel.leave();
            }).catch(error => console.log(error));
        }
    }
}