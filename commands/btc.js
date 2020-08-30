const fetch = require("node-fetch");

module.exports = {
  name: "btc",
  description: "Display BTC price on USD.",
  execute(message, args, client, Discord) {
    (async () => {
      //Get the price of 10000 USD on Bitcoin
      const response = await fetch(
        "https://blockchain.info/tobtc?currency=USD&value=10000"
      );
      const json = await response.json();

      const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`BTC: ${(10000 / json).toFixed(2)}USD`);

      message.channel.send(exampleEmbed);
    })();
  },
};
