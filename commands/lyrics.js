const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "letra",
  aliases: ["ly"],
  description: "Busca a letra da música sendo tocada no momento.",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Não há nada tocando").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Não encontrei a letra de ${queue.songs[0].title}. 😥`;
    } catch (error) {
      lyrics = `Não encontrei a letra de ${queue.songs[0].title}. 😥`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${queue.songs[0].title} — Letra`)
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
