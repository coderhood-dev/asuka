const Task = require("../models/task").Task;

module.exports = {
  name: "to-do",
  description: "task manager",
  execute(message, args, { Discord }) {
    (async () => {
      let taskName;
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      switch (args[0]) {
        case "list":
          const tasks = await Task.find({
            active: true,
            channel_id: {
              $eq: message.channel.id,
            },
          });
          if (tasks.length === 0) {
            const embedMsg = new Discord.MessageEmbed()
              .setColor(`#${randomColor}`)
              .setDescription("Not found any task :/");

            message.channel.send(embedMsg);
          } else {
            const groupedTasks = groupBy(tasks, "status");
            randomColor = Math.floor(Math.random() * 16777215).toString(16);
            Object.keys(groupedTasks).map(status => {
              groupedTasks[status].map((task) => {
              const embedMsg = new Discord.MessageEmbed()
                .setColor(`#${randomColor}`)
                .setTitle(task.name)
                .setDescription(`status: ${status}`)
                .setFooter(`last update: ${task.last_update}`);

              message.channel.send(embedMsg);
            });
            })
            
          }
          break;
        case "delete":
          if (!args[1]) {
            message.reply(`there was an error trying to execute task command!`);
            return;
          }
          const regex = new RegExp("^" + args[1]);
          const tasksToDelete = await Task.find({
            active: true,
            channel_id: {
              $eq: message.channel.id,
            },
            name: {
              $regex: regex,
            },
          });
          tasksToDelete.map((task) => {
            task.active = false;
            task.status = "deleted";
            task.save();
            const embedMsg = new Discord.MessageEmbed()
              .setColor(`#${randomColor}`)
              .setTitle(task.name)
              .setDescription(`Finalized u-u`);

            message.channel.send(embedMsg);
          });
          break;
          case "set":
          if (!args[1] || !args[2]) {
            message.reply(`there was an error trying to execute task command!`);
            return;
          }
          taskName = args.slice(2).join(" ");
          const nameSearch = new RegExp("^" + taskName);
          const tasksToSet = await Task.find({
            active: true,
            channel_id: {
              $eq: message.channel.id,
            },
            name: {
              $regex: nameSearch,
            },
          });
          tasksToSet.map((task) => {
            task.status = args[1];
            task.last_update = new Date();
            task.save();
            const embedMsg = new Discord.MessageEmbed()
              .setColor(`#${randomColor}`)
              .setTitle(taskName)
              .setDescription(`New status: ${args[1]}`)
              .setFooter(`Last update: ${task.last_update}`)
              
            message.channel.send(embedMsg);
          });
          break;
        default:
          taskName = args.join(" ");
          Task.exists(
            {
              channel_id: { $eq: message.channel.id },
              name: { $eq: taskName },
              active: true,
            },
            function (err, doc) {
              if (!doc) {
                const newTask = new Task({
                  owner_id: message.author.id,
                  guild_id: message.guild.id,
                  channel_id: message.channel.id,
                  name: taskName,
                });
                
                const embedMsg = new Discord.MessageEmbed()
                .setColor(`#${randomColor}`)
                .setTitle(`Task created: ${taskName}`)
                
              message.channel.send(embedMsg);
             };
            
            }
          );
          break;
      }
    })();
  },
};

function errorOnSave(err) {
  if (err) {
    console.log(`${message.author} Error saving task :/`, { err });
  }
}
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};