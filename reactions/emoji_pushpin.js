const Pin = require("../models/pin").Pin;

module.exports = {
	identifier: '%F0%9F%93%8C',
	description: 'Pin Message',
	execute(reaction) {
	(async () => {
		Pin.exists({
			channel_id: {$eq: reaction.message.channel.id},
			message_id: {$eq: reaction.message.id},
		}, function (err, doc) { 
			if (!doc){
				const newPin = new Pin({
					owner_id: reaction.message.author.id,
					guild_id: reaction.message.guild.id,
					channel_id: reaction.message.channel.id,
					message_id: reaction.message.id,
					message: reaction.message.content,
				});
				newPin.save(errorOnSave);
				reaction.message.channel.send(`pin created: ${reaction.message.content}`);
			}
		});
		
	})();
	},
};

function errorOnSave(err) {
	if (err) {
		console.log(`${message.author} Error saving Pin :/`, {err})
	}
}