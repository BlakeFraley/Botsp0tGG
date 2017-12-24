//const botsettings = require("./botsettings.json");
const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
const prefix = ".";
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props)
    });
});

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

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);

    /*
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
        if(toMute.highestRole.position >= message.member.highestRole.position)
            return message.channel.send("You can only mute those with lower roles.");
        
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

    if(command === `${prefix}unmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send("You don't have the necessary permissions!");
    
    //Get the mentioned user/mutee(is that a word? lol)
    //Can be a mention(@Kav) or an ID number(123456789)
    let role = message.guild.roles.find(r => r.name === "Botsp0tGGMuted");
    if(!role) return message.channel.send("Nobody has been muted yet.");
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Specify who you want to unmute!");
    if(!toMute.roles.has(role.id)) return message.channel.send("Nani! They aren't muted!");
    
    await toMute.removeRole(role);
    message.channel.send("Unmuted successfully.");

    return;
    }
    */
});


bot.login('MzkyNDMwMzUyOTMwNTcwMjQw.DRnH2A.DL56XTZa9fvKYdVJZlcR7pZkwD8');