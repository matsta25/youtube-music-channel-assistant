const youtubeDlHelpers = require('../helpers/youtubeDlHelpers')
const imageHelpers = require('../helpers/imageHelpers')

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