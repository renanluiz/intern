module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Mostra a média (em ms) do bot",
  execute(message) {
    message.reply(`📈 Ping em média da API: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
