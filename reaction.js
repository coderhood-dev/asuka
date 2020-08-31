module.exports = {
  name: "Reaction",
  description:
    "Allow the bot to use the entire message if the comment isnt a command",
  reaction(message) {
    if (message.content.length > 650) {
      const reactionEmoji = message.guild.emojis.cache.find(
        (emoji) => emoji.name === "muchotexto"
      );
      message.react(reactionEmoji);
    }
  },
};
