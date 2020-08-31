const Pin = require("../models/pin").Pin;
const commands = [
  {
    name: "help",
    description: "Show pin commands",
  },
  {
    name: "list",
    description: "Show all pinned messages for current channel",
  },
  {
    name: "delete",
    description: "Delete all pinned messages that start with given param",
  },
];
module.exports = {
  name: "pin",
  description: "Manage pinned elements on channel",
  execute(message, args, { Discord }) {
    (async () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      switch (args[0]) {
        case "help":
          commands.map((command) => {
            const embedMsg = new Discord.MessageEmbed()
              .setColor(`#${randomColor}`)
              .setTitle(command.name)
              .setDescription(command.description);

            message.channel.send(embedMsg);
          });
          break;
        case "list":
          const items = await Pin.find({
            pinned: true,
            channel_id: {
              $eq: message.channel.id,
            },
          });
          if (items.length === 0) {
            const embedMsg = new Discord.MessageEmbed()
              .setColor(`#${randomColor}`)
              .setDescription(`Not pinned messages on current channel`);

            message.channel.send(embedMsg);
          } else {
            items.map((item) => {
              const embedMsg = new Discord.MessageEmbed()
                .setColor(`#${randomColor}`)
                .setDescription(item.message)
                .setFooter(`id: ${item.message_id}`);

              message.channel.send(embedMsg);
            });
          }
          break;
        case "delete":
          if (!args[1]) {
            message.reply(`there was an error trying to execute pin command!`);
            return;
          }
          const regex = new RegExp("^" + args[1]);
          const itemsToDelete = await Pin.find({
            pinned: true,
            channel_id: {
              $eq: message.channel.id,
            },
            message_id: {
              $regex: regex,
            },
          });
          itemsToDelete.map((item) => {
            item.pinned = false;
            item.save();
            const embedMsg = new Discord.MessageEmbed()
              .setColor(`#${randomColor}`)
              .setDescription(`${item.message_id} unpined!`);

            message.channel.send(embedMsg);
          });
          break;
        default:
          break;
      }
    })();
  },
};
