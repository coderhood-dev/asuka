module.exports = {
    name: "dice",
    value: "Wanna play dice?",
    execute(message) {
        message.channel.send(Math.floor(Math.random() * 6) + 1)
    }
}