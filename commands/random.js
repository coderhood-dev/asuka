module.exports = {
  name: "random",
  description: "Select a random element from parameters.",
  execute(message, args) {
    message.channel.send(args[Math.floor(Math.random() * args.length)]);
  },
};
