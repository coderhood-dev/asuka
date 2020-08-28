const strTxt = [
  "B-Baka!",
  "ANTA BAKA!",
  "If I feel like it, AHO!",
  "God, you are so useless!",
];

const endTxt = [
  "B-Baka!",
  "ANTA BAKA!",
  "I...It's not like I wanted to remind you or anything like that, I just hapenned to have time",
  "I- I reminded you by chance,  Don't get the wrong idea, BAKA!",
  "I- I just remembered by chance, Don't get the wrong idea!",
  "I- It's not like I'm doing this for you!",
  "You better be grateful, AHO!",
];

const getTimeToRemind = (timeInput = "5") => {
  let unitName,
    ms,
    unit = parseInt(timeInput);
  switch (timeInput[timeInput.length - 1]) {
    case "h":
      unitName = "hour(s)";
      ms = unit * 60 * 60 * 1000;
      break;
    case "s":
      unitName = "second(s)";
      ms = unit * 1000;
      break;
    case "m":
    default:
      unitName = "minute(s)";
      ms = unit * 60 * 1000;
  }
  return { unitName, ms, unit };
};

module.exports = {
  name: "remindme",
  description: "Remind me in x time. e.g: remindme send email 3m",
  execute(message, args, client, Discord) {
    const remindText = args.slice(0, -1).join(" ").toString();
    const inputTime = args.length > 1 ? args[args.length - 1] : "5";
    const remindTime = getTimeToRemind(inputTime);

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const randomEndText = endTxt[Math.floor(Math.random() * endTxt.length)];
    const randomStrText = strTxt[Math.floor(Math.random() * strTxt.length)];

    const createEmbedMsg = (title, msg, timestamp = "") =>
      new Discord.MessageEmbed()
        .setColor(`#${randomColor}`)
        .setTitle(title)
        .setDescription(msg)
        .setFooter(timestamp);

    const remindStart = createEmbedMsg(
      "Reminder setted",
      `I'll remind you in ${remindTime.unit} ${remindTime.unitName}.`,
      `- ${randomStrText}`
    );

    const remindEndMsg = createEmbedMsg(
      `Reminder: ${remindText}`,
      `${remindTime.unit} ${remindTime.unitName} ago.`,
      ` - ${randomEndText}`
    );

    message.channel.send(remindStart);

    setTimeout(() => {
      message.channel.send(`Reminder for ${message.author}`);
      message.channel.send(remindEndMsg);
    }, remindTime.ms);
  },
};
