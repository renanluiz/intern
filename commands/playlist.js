const { MessageEmbed } = require("discord.js");
const { play } = require("../include/play");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader").default;
const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID, MAX_PLAYLIST_SIZE, DEFAULT_VOLUME } = require("../util/EvobotUtil");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "playlist",
  cooldown: 5,
  aliases: ["pl"],
  description: "Toca uma playlist do Youtube",
  async execute(message, args) {
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!args.length)
      return message
        .reply(`Digite: ${message.client.prefix}playlist  <URL Playlist do YouTube ou Nome da Playlist >`)
        .catch(console.error);
    if (!channel) return message.reply("Você precisa ingressar em um canal de voz primeiro!").catch(console.error);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.reply("Não foi possível conectar ao canal por falta de permissões");
    if (!permissions.has("SPEAK"))
      return message.reply("Eu não consigo tocar nesse canal de voz, por favor garanta que eu tenha as permissões necessárias!");

    if (serverQueue && channel !== message.guild.me.voice.channel)
      return message.reply(`Você precisa estar no mesmo canal que ${message.client.user}`).catch(console.error);

    const search = args.join(" ");
    const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const url = args[0];
    const urlValid = pattern.test(args[0]);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: DEFAULT_VOLUME || 100,
      playing: true
    };

    let playlist = null;
    let videos = [];

    if (urlValid) {
      try {
        playlist = await youtube.getPlaylist(url, { part: "snippet" });
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return message.reply("Playlist não encontrada :(").catch(console.error);
      }
    } else if (scdl.isValidUrl(args[0])) {
      if (args[0].includes("/sets/")) {
        message.channel.send("⌛ buscando playlist...");
        playlist = await scdl.getSetInfo(args[0], SOUNDCLOUD_CLIENT_ID);
        videos = playlist.tracks.map((track) => ({
          title: track.title,
          url: track.permalink_url,
          duration: track.duration / 1000
        }));
      }
    } else {
      try {
        const results = await youtube.searchPlaylists(search, 1, { part: "snippet" });
        playlist = results[0];
        videos = await playlist.getVideos(MAX_PLAYLIST_SIZE || 10, { part: "snippet" });
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    const newSongs = videos.map((video) => {
      return (song = {
        title: video.title,
        url: video.url,
        duration: video.durationSeconds
      });
    });

    serverQueue ? serverQueue.songs.push(...newSongs) : queueConstruct.songs.push(...newSongs);
    const songs = serverQueue ? serverQueue.songs : queueConstruct.songs;

    let playlistEmbed = new MessageEmbed()
      .setTitle(`${playlist.title}`)
      .setDescription(songs.map((song, index) => `${index + 1}. ${song.title}`))
      .setURL(playlist.url)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (playlistEmbed.description.length >= 2048)
      playlistEmbed.description =
        playlistEmbed.description.substr(0, 2007) + "\nPlaylist maior que o limite de caracteres...";

    message.channel.send(`${message.author} Playlist iniciada`, playlistEmbed);

    if (!serverQueue) {
      message.client.queue.set(message.guild.id, queueConstruct);

      try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Não consegui entrar no canal. 😥: ${error.message}`).catch(console.error);
      }
    }
  }
};
