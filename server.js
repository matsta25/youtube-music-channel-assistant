require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const mainRouter = require("./routes/main");
const createRouter = require("./routes/create");

const fixMiddleware = require("./spa-fix");

app.use(fixMiddleware);

require("./passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "ymca",
    resave: false,
    saveUninitialized: true
  })
);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, "./dist")));

app.use(passport.initialize());
app.use(passport.session());

app.use("*", mainRouter);
app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/create", createRouter);

const video = require("./routes/video");
app.use("/api/video", video);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  // eslint-disable-next-line
  console.log(`Example app listening on port ${port}!`)
);

global.io = require("socket.io")(server);
global.io.on("connection", function(socket) {
  socket.on("disconnect", function() {});
});
