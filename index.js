//const botsettings = require("./botsettings.json");
const Discord = require('discord.js');
const music = require('discord.js-musicbot-addon');
const fs = require("fs");
const bot = new Discord.Client();
const discordkey = require("./discordkey.json");
var config = JSON.parse(fs.readFileSync('./botsettings.json', 'utf-8'));
const yt_api_key = config.yt_api_key;
const bot_controller = config.bot_controller;
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
    /*
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let mess = message.content.toLowerCase();
    const member = message.member;

    
    if(!command.startsWith(prefix)) return;
    if(command.startsWith(prefix + "play" ||
        prefix + "skip" || prefix + "queue" || prefix + "pause"
        || prefix + "resume" || prefix + "volume" || prefix + "leave"
        || prefix + "clearqueue")) {
        music(bot, {prefix: '.', clearInvoker: true});
        return;
    }
    
    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
    */
});

music.start(bot, {youtubeKey: yt_api_key, prefix: '.'});

bot.login(discordkey.key);