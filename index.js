//const botsettings = require("./botsettings.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = ".";


bot.on("ready", async () => {
    console.log('Beep boop! Botsp0t is ready!');

    try{
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack)
    }
    
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}pico`) {
        return message.channel.send("[Backdashes in Japanese]");
    }

    if(command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is the user's info")
            .setColor("#ef6413")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("Created At", message.author.createdAt);

        message.channel.send(embed);

        return;

        
    }

    if(command === `${prefix}mute`) {
        //Check for permissions/role hierarchy
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send("You don't have the necessary permissions!");
        
        //Get the mentioned user/mutee(is that a word? lol)
        //Can be a mention(@Kav) or an ID number(123456789)
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.send("Huh? Please specify who is to be muted.");

        if(toMute.id === message.author.id) return message.channel.send("You can't mute yourself, bud.");
        
        let role = message.guild.roles.find(r => r.name === "Botsp0tGGMuted");
        if(!role) {
            try{
                role = await message.guild.createRole({
                    name: "Botsp0tGG Muted",
                    color: "#000000",
                    permissions: []
                });
    
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
            }
        }

        if(toMute.roles.has(role.id)) return message.channel.send("They've already been muted!");

        await toMute.addRole(role);
        message.channel.send("Muted successfully.");

        return;
    }
});


bot.login('MzkyNDMwMzUyOTMwNTcwMjQw.DRnH2A.DL56XTZa9fvKYdVJZlcR7pZkwD8');