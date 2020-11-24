const fetch = require("node-fetch");

const CMC_TOKEN = process.env.CMC_TOKEN

module.exports = {
  name: "price",
  description: "Display current crypto price on USD.",
  execute(message, args, { Discord }) {
    (async () => {
      const symbol = args[0] || "BTC"
      const response = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`
      ,{headers: {
        'X-CMC_PRO_API_KEY': CMC_TOKEN
      }});
      const json = await response.json();
      const percent_change_24h = json.data[symbol].quote.USD.percent_change_24h;

      const embedMessage = new Discord.MessageEmbed()
        .setColor(percent_change_24h > 0 ? "#00C075" : "#FC6C7C")
        .setTitle(`${json.data[symbol].name}: ${(json.data[symbol].quote.USD.price).toFixed(2)} USD`)
        .setDescription(`24h Change: ${(percent_change_24h).toFixed(2)}%`);

      message.channel.send(embedMessage);
    })();
  },
};
