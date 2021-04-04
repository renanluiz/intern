module.exports = {
  name: "invite",
  description: "Envia um convite para o bot",
  execute(message) {
    
    return message.member
      .send('Infelizmente essa função está desabilitada. Esse bot é exclusivo do discord Estags.globo por enquanto 😊.'
        /* 
        `https://discord.com/oauth2/authorize?client_id=${message.client.user.id}&permissions=70282305&scope=bot
    `
    */
      )
      .catch(console.error);
  }
};
