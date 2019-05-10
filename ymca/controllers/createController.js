const youtubeDl = require('../youtubeDlActions')
const imageActions = require('../imageActions')

exports.downloadMp3 = (req, res) => {
    let url = req.body.url;
    youtubeDl.downloadMp3(url);
    res.json({
        data: `start downloadMp3(${url})`
    })
}

exports.saveBackgroundPhoto = (req, res) => {
    let backgorundImage = req.file;
    imageActions.saveBackgroundImage(backgorundImage);
    res.json({
        data: backgorundImage
    })
}