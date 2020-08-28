module.exports = {
    name: 'say',
    description: "Make the bot say something",
    execute(message, args, client)
    {
        message.channel.send(args.join(" "))
    }
}