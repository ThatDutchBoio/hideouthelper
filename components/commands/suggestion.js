const discord = require('discord.js');

module.exports.suggest = (msg,bot) =>{
    var args = msg.content.substring(1).split(' ');
    args.shift();
    var x = args.join(' ');
    const sugChan = msg.guild.channels.cache.find(c => c.id == '806404807182254112');
    const sugEmb = new discord.MessageEmbed()
        .setTitle(`${msg.author.tag}'s Suggestion:`)
        .setDescription(x)
        .setColor("BLUE")
        .setTimestamp()
    sugChan.send(sugEmb).then(message =>{
        message.react('👍')
        message.react('👎')
    });
    

}