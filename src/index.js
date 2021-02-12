const discord = require('discord.js');
const bot = new discord.Client();
const {token,prefix} = require('../jsonfiles/config.json');
const Canvas = require('canvas')
const path = require('path')

bot.on('ready',() =>{
    console.log('bot online');
})
const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
};
bot.on('guildMemberAdd', async member => {
    const welcome = new discord.MessageEmbed()
        .setTitle("Welcome to the server!")
        .setDescription("We hope you have a nice stay and hope to see ya chatting soon! \n if you need help with anything at all be sure to make a ticket using !ticket! a staff member will be with you shortly")
        .setAuthor(bot.user.tag, bot.user.avatarURL({
            dynamic: false,
            format: 'png',
            size: 512
        }))
        .setColor("RED")

    member.createDM({
        embed: welcome
    })
    if(!member.user.avatarURL) return;
    const channel = bot.channels.cache.find(c => c.id == '805993277446029385')
    if (!channel) return console.log('error');

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('src/resources/bg.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5)

    ctx.font = applyText(canvas, member.displayName);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(member.user.avatarURL({
        format: "jpg"
    }));

    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    channel.send(`Welcome to the server, ${member}!`, attachment);



})

bot.on("message", async (msg) =>{
    if(!msg.author.bot || msg.content.startsWith(prefix)){
        if(msg.channel.name == 'creations'){
            msg.react('⭐');
            var x = require('../components/data/xpData').get(msg.author.id,msg.guild.id,msg.author.username)
            require('../components/data/xpData').addXP(x,5);
        }
        if(msg.channel.type != 'dm'){
            console.log(msg.channel.type)
            var eco = require('../components/data/xpData').get(msg.author.id,msg.guild.id,msg.author.username);
            require("../components/data/xpData").addXP(eco,1);
            var args = msg.content.substr(prefix.length).split(' ');
            switch(args[0]){
                case 'kick':
                    require('../components/commands/kick').kick(msg,bot);
                break;
                case 'ban':
                    require('../components/commands/ban').ban(msg,bot);
                break;
                case 'warn':
                    require('../components/commands/warn').warn(msg,bot);
                break;
                case 'warns':
                    require('../components/commands/warns').warns(msg,bot);
                break;
                case 'clearwarns':
                    require('../components/commands/warns').clear(msg);
                break;
                case 'purge':
                    require('../components/commands/purge').purge(msg);
                break;
                case 'mute':
                    require('../components/commands/mute').mute(msg,bot);
                break;
                case 'lvl':
                    require('../components/commands/lvl').lvl(msg);
                break;
                case 'leaderboard':
                    require('../components/commands/leaderboard').leaderboard(msg);
                break;
                case 'info':
                    require('../components/commands/info').info(msg,bot);
                break;
                case 'announce':
                    require('../components/commands/announce').anounce(msg,bot);
                break;
                case 'post':
                    require('../components/commands/post').post(msg,bot);
                break;
                case 'emit':
                    if(msg.member.hasPermission("ADMINISTRATOR")){
                        bot.emit("guildMemberAdd",msg.author);
                    }
                break;
                case 'ticket':
                    require('../components/commands/ticket').ticket(msg,bot);
                break; 
                case 'closeticket':
                    require('../components/commands/ticket').closeticket(msg,bot);
                break;
                case 'suggestion':
                    require('../components/commands/suggestion').suggest(msg,bot);
                break;
                case 'setusername':
                    if(msg.author.id == '250761057881161738' || msg.author.id == '188708544269254656'){
                        var x = args;
                        x.shift();
                        bot.user.setUsername(x.join(' '));
                    }
                break;
                case 'setstatus':
                    if(msg.author.id == '250761057881161738' || msg.author.id == '188708544269254656'){
                        var x = args;
                        x.shift();
                        bot.user.setActivity(x.join(' '));
                    }
                break;
                case 'setstatus':
                    if(msg.author.id == '250761057881161738' || msg.author.id == '188708544269254656'){
                        var x = args;
                        x.shift();
                        bot.user.setStatus(x.join(' '));
                    }    
                break;
                case 'setavatar':
                    if(msg.author.id == '250761057881161738' || msg.author.id == '188708544269254656'){
                        if(!msg.attachments.first()) return;
                        bot.user.setAvatar(msg.attachments.first().url)
                    }
                break;
    
            }
        }
    }
})

bot.on('messageReactionAdd',(react,user) =>{
    var x = react.message.guild.members.cache.find(m => m.id == user.id);
    if(x.hasPermission("ADMINISTRATOR") && react.count < 3 && react.count == 2){
        switch(react.emoji.name){
            case '✅':
                var cId = react.message.content;
                var channel = react.message.guild.channels.cache.find(c => c.id == cId);
                channel.send(react.message.embeds[0]);
            break;
            case '❌':
                react.message.delete();
            break;
        }
    }
})


bot.login(token);
