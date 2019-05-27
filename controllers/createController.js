const youtubeDlHelpers = require("../helpers/youtubeDlHelpers");
const imageHelpers = require("../helpers/imageHelpers");
const ffmpegHelpers = require("../helpers/ffmpegHelpers");
const youtubeApiHelpers = require("../helpers/youtubeApiHelpers");

const User = require("../models/user");

exports.downloadMp3 = (req, res) => {
  let url = req.body.url;
  youtubeDlHelpers.downloadMp3(url);
  res.json({
    data: `start downloadMp3(${url})`
  });
};

exports.saveBackgroundPhoto = (req, res) => {
  let backgorundImage = req.file;
  imageHelpers.saveBackgroundImage(backgorundImage);
  res.json({
    data: backgorundImage
  });
};

exports.saveLogo = (req, res) => {
  let logo = req.file;
  imageHelpers.saveLogo(logo);
  res.json({
    data: logo
  });
};

exports.makeVideo = (req, res) => {
  let audio = req.body.data.audio;
  let video = req.body.data.video;
  let logo = req.body.data.logo;

  let data = {
    audio: audio,
    video: video,
    logo: logo
  };
  ffmpegHelpers
    .resizePhoto(data)
    .then(ffmpegHelpers.cropVideo)
    .then(ffmpegHelpers.margeVideoAudio);

  res.json({
    data: `${audio} + ${video} + ${logo}`
  });
};

exports.sendToYoutube = (req, res) => {
  let path = req.body.data.path;
  let accessToken = req.body.data.accessToken;
  let title = req.body.data.title;
  let descritpion = req.body.data.descritpion;

  let data = {
    path: path,
    accessToken: accessToken,
    title: title,
    descritpion: descritpion
  };

  youtubeApiHelpers.sendToYoutube(data);

  res.json({
    data: `Sending to yt: ${JSON.stringify(data)}`
  });
};

exports.saveTemplate = (req, res) => {
  let descritpion = req.body.data.descritpion;
  let id = req.body.data.id;

  User.findOneAndUpdate(
    { id: id },
    { $set: { lastTemplateDescription: descritpion } },
    { useFindAndModify: false },
    function(err, doc) {
      if (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  );

  res.json({
    data: `Saving ${JSON.stringify(descritpion)}`
  });
};
