const discord = require('discord.js')


module.exports.ban = (msg,bot) =>{
    if(msg.member.hasPermission("ADMINISTRATOR")){
        var toBan = msg.mentions.members.first();
        toBan.ban();
        var x = (msg.guild.members.cache.get(toBan.id))? true : false;
        var kEmb = new discord.MessageEmbed()
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }));
        if(!x){
            kEmb.setColor("GREEN");
            kEmb.setTitle(`Banned user: ${toKick.user.username}`);
            msg.guild.channels.cache.find(c => c.id = '741852130880782437').send(kEmb);
        }else{
            kEmb.setColor("RED");
            kEmb.setTitle(`Couldn't ban user: ${toKick.user.username}`);
        }
        msg.channel.send(kEmb);
    }
}