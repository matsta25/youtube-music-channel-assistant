const youtubeDl = require('../youtubeDl')

exports.downloadMp3 = (req, res) => {
    let url = req.body.url;
    youtubeDl.downloadMp3(url);
    res.json({
        data: `start downloadMp3(${url})`
    })
}