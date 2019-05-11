const youtubeDlHelpers = require('../helpers/youtubeDlHelpers')
const imageHelpers = require('../helpers/imageHelpers')
const ffmpegHelpers = require('../helpers/ffmpegHelpers')
const youtubeApiHelpers = require('../helpers/youtubeApiHelpers') 

exports.downloadMp3 = (req, res) => {
    let url = req.body.url;
    youtubeDlHelpers.downloadMp3(url);
    res.json({
        data: `start downloadMp3(${url})`
    })
}

exports.saveBackgroundPhoto = (req, res) => {
    let backgorundImage = req.file;
    imageHelpers.saveBackgroundImage(backgorundImage);
    res.json({
        data: backgorundImage
    })
}

exports.saveLogo = (req, res) => {
    let logo = req.file;
    imageHelpers.saveLogo(logo);
    res.json({
        data: logo
    })
}

exports.makeVideo = (req, res) => {
    let audio = req.body.data.audio;
    let video = req.body.data.video;
    let logo = req.body.data.logo;

    let data = {
        audio: audio,
        video: video,
        logo: logo
    }
    ffmpegHelpers.resizePhoto(data)
    .then(ffmpegHelpers.cropVideo)
    .then(ffmpegHelpers.margeVideoAudio);

    res.json({
        data: `${audio} + ${video} + ${logo}`
    })
}

exports.sendToYoutube = (req, res) => {
    let path = req.body.data.path;
    let accessToken = req.body.data.accessToken;

    let data = {
        path: path,
        accessToken: accessToken
    }

    youtubeApiHelpers.sendToYoutube(data)

    res.json({
        data: `Sending to yt: ${JSON.stringify(data)}`
    })
}

