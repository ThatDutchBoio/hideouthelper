const discord = require('discord.js')


module.exports.kick = (msg,bot) =>{
    if(msg.member.hasPermission("ADMINISTRATOR")){
        var toKick = msg.mentions.members.first();
        toKick.kick();
        var x = (msg.guild.members.cache.get(toKick.id))? true : false;
        var kEmb = new discord.MessageEmbed()
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }));
        if(!x){
            kEmb.setColor("GREEN");
            kEmb.setTitle(`Kicked user: ${toKick.user.username}`);
            msg.guild.channels.cache.find(c => c.id = '741852130880782437').send(kEmb);
        }else{
            kEmb.setColor("RED");
            kEmb.setTitle(`Couldn't kick user: ${toKick.user.username}`);
        }
        msg.channel.send(kEmb);
    }
}