const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
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
}

module.exports.help = {
    name: "mute"
}