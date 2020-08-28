const Roll = require('roll')
const roll = new Roll();

module.exports = {
	name: 'roll',
	description: 'Display a result element from.',
	execute(message, args) {
        const attack = roll.roll(args[0])
		message.channel.send(`Executed ${args[0]}\nResult:${attack.result}`);
	},
};