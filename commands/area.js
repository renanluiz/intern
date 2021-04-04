module.exports = {
  name: "area",
  description: "Atribua uma role a você com o nome da área que você trabalha na empresa.",
  execute(message) {

    const content = message.content.split(' ');
    let name = content[1];

    for(var i=2; i<content.length; i++){
        name += ' ' + content[i];
    }

    let color = Math.floor(Math.random()*16777215).toString(16);
    color = '#' + color;

        message.guild.roles.create({
            data: {
            name: name,
            color: color,
            },
            reason: 'Created by user',
        }).then(() => {
            let role = message.guild.roles.cache.find(role => role.name === name);
            role.setHoist(true)
            message.member.roles.add(role); //Add role to the user
            console.log(role);
            role.deleted = true;
        });
        message.reply('Pronto! Alterei seu status para: ' + name);
    }
};
