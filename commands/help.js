module.exports = {
	name: 'help',
	description: 'Display info about this bot.',
	execute(message, args, client) {
		message.channel.send(`commands:\n ${client.commands.map(command => `${command.name}: ${command.description}\n`)}`);
	},
};