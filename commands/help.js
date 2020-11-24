module.exports = {
  name: "help",
  description: "Display info about this bot.",
  execute(message, __args, { client }) {
    message.channel.send(
      `Commands:\n${client.commands
        .map((command) => `${command.name}: ${command.description}`)
        .join("\n")}`
    );
  },
};
