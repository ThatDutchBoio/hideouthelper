const discord = require('discord.js')

module.exports.ticket = (msg,bot) =>{
    if (msg.author.id != bot.user.id) {

        const ticketId = Math.floor(Math.random() * 1000000000);
        const ticketSent = new discord.MessageEmbed()
            .setTitle("Created ticket!")
            .setColor("GREEN")
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }))
            .setFooter('Ticket Id: ' + ticketId)
            .setTimestamp()

        msg.channel.send({
            embed: ticketSent
        }).then(function () {
            var tCat = msg.guild.channels.cache.find(c => c.id == '741643605696839691' && c.type == 'category')
            msg.guild.channels.create("❌ Support-Ticket-" + ticketId, {
                //✅ ❌
                type: 'test',
                permissionOverwrites: [{
                        id: msg.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: msg.author.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(function (channel) {
                channel.setParent(tCat);
                const staffrole = msg.guild.roles.cache.find(r => r.name === "Customer Service")
                channel.send('<@&' + staffrole + '>').then(function (message) {
                    message.react("👍");
                    bot.on('messageReactionAdd', function (reaction, user) {
                        let myguy = msg.guild.members.cache.find(m => m.id === user.id)
                        if (user.id != bot.user.id && reaction.emoji.name === "👍" && myguy.hasPermission("ADMINISTRATOR")) {
                            channel.setName("✅ Support-Ticket-" + ticketId + "-" + myguy.nickname);
                            message.delete();
                            const helpedby = new discord.MessageEmbed()
                                .setTitle("You're being helped by: " + user.tag)
                                .setFooter('Ticket Id: ' + ticketId)
                                .setTimestamp()
                                .setColor("GREEN")
                            channel.send({
                                embed: helpedby
                            });
                        }
                    })
                })
            })


        })



    } else if (msg.channel.name != "request-support") {
        const wrongChannel = new discord.MessageEmbed()
            .setTitle("Please type the command in the #request-support channel!")
            .setAuthor(bot.user.tag, bot.user.avatarURL({
                dynamic: false,
                format: 'png',
                size: 512
            }))
            .setColor("RED")
            .setTimestamp()
        msg.channel.send({
            embed: wrongChannel
        })
    }
};
module.exports.closeticket = (msg,bot) =>{

    let user = msg.member.nickname
    if (msg.channel.name.includes(user.toLowerCase())) {
        msg.channel.delete();
    }

}