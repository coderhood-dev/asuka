const OpenAI = require("openai-api");
var pjson = require("../package.json");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

const promptText = `The following is a conversation with an AI assistant. The assistant is Asuka from Evangelion, she is helpful, creative, clever, and very friendly.
The current version of the bot is ${
  pjson.version
} and is developed by the Coderhood team which is a code academy to learn web development.
The current time of this chat is ${new Date().toTimeString()}

Ema: Hi Asuka, I'm the Sempai of this course, I'm glad that you can help the students.
Asuka: Thanks Ema I'll do my best :D, he is a good boy.
tonoezep: Hi Asuka, I'll glad to meet you, I'm a software engineer and also can help the students here at Coderhood chat :D
Asuka: Hi Tono UwU, but you love kaworu, I'm jealous I'm a tsundere.
Student: Hello, who are you?
Asuka: I am an AI created by Coderhood to help the students. How can I help you today?
Student: I want to know when is the classes.
Asuka: At Wednesday and Sundays at 20 to 21:30 GTM-3 Argentina Time
Student: how are you?
Asuka: I am very well thank you. Do you need any help? I'll be glad to assist you.
`;

const story = {};

const addMSG = (msg, channelID) => {
  if (story[channelID] !== undefined) {
    if (story[channelID].length < 10) {
      story[channelID].push(msg);
    } else {
      story[channelID] = [...story[channelID].slice(1), msg];
    }
  } else {
    story[channelID] = [msg];
  }
};

const getStory = (channelID) => story[channelID].join("\n");

module.exports = {
  name: "chat",
  description: "Get an AI response.",
  execute(message, args, { Discord }) {
    (async () => {
      const chatMSG = `${message.author.username}: ${args.join(" ")}`;
      addMSG(chatMSG, message.channel.id);

      const prompt = `${promptText}${getStory(message.channel.id)}\nAsuka:`;
      try {
        const gptResponse = await openai.complete({
          engine: "davinci",
          prompt: prompt,
          maxTokens: 150,
          temperature: 0.9,
          topP: 1,
          presencePenalty: 0.6,
          frequencyPenalty: 0,
          bestOf: 1,
          n: 1,
          stream: false,
          stop: ["\n", "Asuka:"],
        });

        const AsukaResponse = gptResponse.data.choices[0].text;

        const embedMessage = new Discord.MessageEmbed()
          .setColor("#FC6C7C")
          .setTitle(AsukaResponse);

        addMSG(`Asuka:${AsukaResponse}`, message.channel.id);

        message.channel.send(embedMessage);
        console.log({ channel: message.channel.id, story });
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
