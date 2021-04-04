const move = require("array-move");
const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "mover",
  aliases: ["mv"],
  description: "Move músicas na fila de reprodução",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Não há nenhuma fila no momento.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Digite: ${message.client.prefix}mover <número na fila>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Digite: ${message.client.prefix}mover <número na fila>`);

    let song = queue.songs[args[0] - 1];

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      `${message.author} 🚚 moveu **${song.title}** para ${args[1] == 1 ? 1 : args[1] - 1} na fila de reprodução.`
    );
  }
};
