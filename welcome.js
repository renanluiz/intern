const Discord = require("discord.js");
const helpEmbed = require('./commands/help.js')
module.exports = client =>{

  const channelId = '';
  const guild = '';
  const targetChannel = '';

client.on('guildMemberAdd', async (member) =>{

  let embed = new Discord.MessageEmbed()
  .setColor('#009EFF')
  .setAuthor(member.user.tag, member.user.displayAvatarURL())
  .setTitle('Bem-vindo(a)')
  .setDescription(`Seja bem-vindo(a) ao servidor dos Estagiários da Globo ${member.user}! Aqui fazemos networking, damos risadas e de vez em quando jogamos alguns jogos para descontrair 🤣.

  Para consultar a lista de comandos disponíveis, clique aqui -> ${member.guild.channels.cache.get(targetChannel)} ou digite !help em qualquer chat de texto do servidor.
  
  Para utilizá-los basta digitar ![nome-do-comando]`)
  .setImage('https://media2.giphy.com/media/fU4elxKlRsulB4Jy7w/200.gif')
  .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: 'png', size: 1024}))
  .setTimestamp();

  const channel = member.guild.channels.cache.get(channelId);
  await member.send(embed);
});

}