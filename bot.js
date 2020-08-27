const fs = require('fs');
const Discord = require('discord.js');
const Roll = require('roll')

const { prefix, token } = require('./config.js');
const { reaction } = require('./reaction.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const roll = new Roll();

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
        message.reply(`ANTA BAKA! \n${command} not makes any sense for me!`);
        return;
      };

      try {
          client.commands.get(command).execute(message, args, client, roll);
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