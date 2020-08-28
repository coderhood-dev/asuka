const Discord = require("discord.js");

module.exports = {
  name: "remindme",
  description: "Remind me in x time. e.g: remindme send email 3m",
  execute(message, args) {
    const remindText = args.slice(0, -1).join(" ").toString();
    const inputTime = args[args.length - 1];
    const areMins = inputTime[inputTime.length - 1] === "m";

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    const remindTime = areMins ? parseInt(inputTime) * 60000 : parseInt(inputTime) * 1000;

    const createEmbedMsg = (title, msg, timestamp = "") =>
      new Discord.MessageEmbed()
        .setColor(`#${randomColor}`)
        .setTitle(`${title}`)
        .setDescription(msg)
        .setFooter(timestamp);

    const remindStart = createEmbedMsg(
      "Reminder",
      `I'll remind you in ${parseInt(inputTime)} ${
        areMins ? "minutes" : "seconds"
      }!`
    );

    const remindEndMsg = createEmbedMsg(
      `Reminder for ${message.author.username}`,
      remindText,
      `${parseInt(inputTime)} ${areMins ? "minute(s)" : "second(s)"} ago`
    );

    message.channel.send(remindStart);

    setTimeout(() => {
      message.channel.send(remindEndMsg);
    }, remindTime);
  },
};
