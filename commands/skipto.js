const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Pula para a música da fila por número",
  execute(message, args) {
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Digite: ${message.client.prefix}${module.exports.name} <número na fila>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Não há nenhuma fila no momento.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`A fila possui ${queue.songs.length} músicas!`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ pulou ${args[0] - 1} músicas`).catch(console.error);
  }
};
