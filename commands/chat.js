const OpenAI = require("openai-api");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);

const promptText = `The following is a conversation with an AI assistant. The assistant is Asuka from Evangelion, she is helpful, creative, clever, and very friendly.
Student: Hello, who are you?
Asuka: I am an AI created by Coderhood to help the students. How can I help you today?
Student: I want to know when is the classes.
Asuka: At Wednesday and Sundays at 20 GTM-3 Argentina Time
Student: how are you?
Asuka: I am very well thank you. Do you need any help? I'll be glad to assist you.
`;

module.exports = {
  name: "chat",
  description: "Get an AI response.",
  execute(message, args, { Discord }) {
    (async () => {
      const prompt = `${promptText}Student:${args.join(" ")}\nAsuka:`;
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
          stop: ["\n", "Student:", "Asuka:"],
        });

        const embedMessage = new Discord.MessageEmbed()
          .setColor("#FC6C7C")
          .setTitle(gptResponse.data.choices[0].text);

        message.channel.send(embedMessage);
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
