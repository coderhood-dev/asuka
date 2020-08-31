module.exports = {
  name: "say",
  description: "Make the bot say something",
  execute(message, args) {
    message.delete();
    message.channel.send(`> ${args.join(" ")}`);
  },
};
