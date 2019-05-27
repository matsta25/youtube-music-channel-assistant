const express = require("express");
const Video = require("../models/video");

module.exports = (() => {
  "use strict";

  const router = express.Router();

  const videoProjection = {
    __v: false,
    _id: false
  };

  router.get("/", (req, res) => {
    Video.findOne({}, videoProjection, (err, video) => {
      if (err) throw err;
      if (!video || video.description === null) {
        const init = new Video({
          description: ""
        });

        init.save(err => {
          if (err) throw err;
          res.json({ video: { description: "" } });
        });
      } else {
        res.json({ video });
      }
    });
  });

  router.post("/", (req, res) => {
    const { video } = req.body;
    const newVideo = video;

    Video.findOneAndUpdate(
      {},
      newVideo,
      { projection: videoProjection },
      (err, score) => {
        if (err) throw err;
        res.json({ video: newVideo });
      }
    );
  });

  return router;
})();
