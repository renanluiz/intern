const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remover",
  aliases: ["rm"],
  description: "Remove uma música da fila",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Não há nenhuma fila no momento.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Digite: ${message.client.prefix}remover <número na fila>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remover <número na fila>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ removeu **${song[0].title}** da fila.`);
  }
};
