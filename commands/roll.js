module.exports = {
	name: 'roll',
	description: 'Display a random element from.',
	execute(message, args) {
		message.channel.send(args[Math.floor(Math.random() * args.length)]);
	},
};