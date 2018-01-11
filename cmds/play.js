const Discord = module.require("discord.js");

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}

function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        if (!json.items[0]) callback("3_-a9nVZYjk");
        else {
            callback(jsonf.items[0].id.videoId);
        }
    });
}

function getID(str, cb) {
    if(isYoutube(str)) 
        cb(getYoutubeID(str));
    else
        search_video(str, function (id) {
            cb(id);
        });
}

function add_to_queue(strID) {
    if(isYoutube(strID)) {
        queue.push(getYoutubeID(strID));
    } else {
        queue.push(strID);
    }
}

function playMusic(id, message) {
    
}

module.exports.run = async (bot, message, args) => {
    if(queue.length > 0 || isPlaying) {
        getID(args, function (id) {
            add_to_queue(id);
            fetchVideoInfo(id, function (err, videoInfo) {
                if (err) throw new Error(err);
                message.reply(`[${videoInfo.title}] has been added to the queue.`);
            });
        });
    } else {
        isPlaying = true;
        getID(args, function (id) {
            queue.push("placeholder");
            playMusic(id, message);
            fetchVideoInfo(id, function (err, videoInfo) {
                if (err) throw new Error(err);
                message.reply(` now playing [${videoInfo.title}]`);
            });
        });
    }
}

module.exports.help = {
    name: "play"
}