module.exports = {
  name: "limpar",
  description: "Limpa o chat do canal de texto.",
  execute(message) {

var pos = message.channel.position;

message.channel.clone().then(c => {
    c.setPosition(pos).catch(err => console.log(err));
}).catch(err => console.error(err));

    message.channel.delete(`Chat limpo.`)

    }
};
