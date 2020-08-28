const fs = require('fs');
const express = require('express');
const Discord = require('discord.js');

const { prefix, token } = require('./config.js');
const { reaction } = require('./reaction.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`${command.name} has been added`)
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(' ');
      const command = args.shift().toLowerCase();
      if (!client.commands.has(command)) {
        message.reply(`ANTA BAKA! \n${command} doesn't make any sense to me!`);
        return;
      };

      try {
          client.commands.get(command).execute(message, args, client, Discord);
      } catch (error) {
          console.error(error);
          message.reply(`there was an error trying to execute ${command} command!`);
      } 
    }
    else {
      reaction(message)
    }
});

client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

client.login(token);

//////

const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);

console.log(`${Date.now()} Ready on port ${process.env.PORT}`);