const fs = require("fs");
const express = require("express");
const Discord = require("discord.js");
const mongoose = require("mongoose");
var cron = require("node-cron");

const { prefix, token, db_url } = require("./config.js");
const { reaction } = require("./reaction.js");

var Reminder = require("./models/reminder").Reminder;

// DB connection
mongoose.connect(db_url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// Discord Client
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// Load commands
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`${command.name} has been added`);
  client.commands.set(command.name, command);
}

// Load reactions
client.reactions = new Discord.Collection();

const reactionFiles = fs
  .readdirSync("./reactions")
  .filter((file) => file.endsWith(".js"));

for (const file of reactionFiles) {
  const reaction = require(`./reactions/${file}`);
  console.log(`${reaction.identifier} has been added`);
  client.reactions.set(reaction.identifier, reaction);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) {
      message.reply(`ANTA BAKA! \n${command} doesn't make any sense to me!`);
      return;
    }

    try {
      client.commands.get(command).execute(message, args, { client, Discord });
    } catch (error) {
      console.error(error);
      message.reply(`there was an error trying to execute ${command} command!`);
    }
  } else {
    reaction(message);
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  const { name } = reaction.emoji;
  if (!client.reactions.has(name)) {
    //Early return if not reaction found
    return;
  }
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
      client.reactions.get(name).execute(reaction, { client, Discord });
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
});

client.on("shardError", (error) => {
  console.error("A websocket connection encountered an error:", error);
});

client.login(token);

////// We need this in order to keep the aplication alive on server
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

console.log(`${Date.now()} Ready on port ${process.env.PORT}`);

////// Schedule for missing reminders

cron.schedule("*/5 * * * *", async () => {
  const events = await Reminder.find({
    sended: false,
    schedule_date: { $lt: new Date() },
  });
  events.map((event) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const remindEndMsg = createEmbedMsg(
      event.title,
      event.message,
      event.footer,
      randomColor
    );
    const author = client.users.resolve(event.owner_id);

    client.channels.resolve(event.room_id).send(`Reminder for ${author}`);
    client.channels.resolve(event.room_id).send(remindEndMsg);

    event.sended = true;
    event.save(errorOnSave);
    console.log("fired reminder");
  });
});

const createEmbedMsg = (title, msg, timestamp = "", randomColor) =>
  new Discord.MessageEmbed()
    .setColor(`#${randomColor}`)
    .setTitle(title)
    .setDescription(msg)
    .setFooter(timestamp);

function errorOnSave(err) {
  if (err) {
    console.log(`${message.author} Error saving reminder :/`, { err });
  }
}
