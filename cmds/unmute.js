const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
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
}

module.exports.help = {
    name: "unmute"
}