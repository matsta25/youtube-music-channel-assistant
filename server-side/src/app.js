const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const shell = require('shelljs');

const multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var randomstring = require("randomstring");

const PORT = 8081

app.use(cors())

var serveIndex = require('serve-index')
app.use('/output', express.static('output'), serveIndex('output', {'icons': true}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/mp3', (req, res) => {
    let url = req.body.data.url;
    console.log(url);
    downloadMp3(url);
    res.json({
        data: `start downloadMp3(${url})`
    })
});

app.post('/api/backgroundimage', upload.single('image'), (req, res) => {
    let backgorundImage = req.file;
    console.log(backgorundImage);
    saveBackgroundImage(backgorundImage);
    res.json({
        data: backgorundImage
    })
});

app.post('/api/logo', upload.single('logo'), (req, res) => {
    let logo = req.file;
    console.log(logo);
    saveLogo(logo);
    res.json({
        data: logo
    })
});

app.post('/api/makevideo', (req, res) => {
    let audio = req.body.data.audio;
    let video = req.body.data.video;
    let logo = req.body.data.logo;

    let data = {
        audio: audio,
        video: video,
        logo: logo
    }
    // makevideo(audio, video, logo);
    resizePhoto(data)
    .then(cropVideo)
    .then(margeVideoAudio);

    res.json({
        data: `${audio} + ${video} + ${logo}`
    })
})

// socket-io

const io = require('socket.io')(server);

io.on('connection', function(socket) {    
    socket.on('disconnect', function() {}); 
});

// youtube-dl

const downloadMp3 = function(url) {
    let promise = new Promise(function (resolve, reject) {
        shell.exec(`youtube-dl --extract-audio --audio-format mp3 -o "./download/%(title)s.%(ext)s" ${url}`, function(code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            io.emit('downloadMp3', {
                data: {
                    code: code,
                    stdout: stdout,
                    stderr: stderr
                }
            })
          });
    }); 
    return promise; 
 }; 

//  saveBackgroundImage

const saveBackgroundImage = function(backgorundImage) {
    let promise = new Promise(function (resolve, reject) {
        let code = 1;
        if ( shell.test('-f', backgorundImage.destination+backgorundImage.filename) ) { 
           code = 0;
        }
        io.emit('backgroundImage', {
            data: {
                code: code
            }
        })
    }); 
    return promise; 
 }; 

//  makevideo


const makevideo = function(audio, video, logo) {
    let promise = new Promise(function (resolve, reject) {
        let filename = randomstring.generate()
        if (!shell.test('-d', './output/')) {
            shell.mkdir('./output/');
        }
        shell.exec(`ffmpeg -loop 1 -i "./${video}" -i "./${logo}" -filter_complex "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" -i "./download/${audio}.mp3" -shortest -c:v libx264 -c:a copy ./output/"${filename}.mkv"`, function(code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            io.emit('makevideo', {
                data: {
                    code: code,
                    stdout: stdout,
                    stderr: stderr,
                    filename: filename
                }
            })
          });
    }); 
    return promise; 
 }; 

//  savelogo

const saveLogo = function(logo) {
    let promise = new Promise(function (resolve, reject) {
        let code = 1;
        if ( shell.test('-f', logo.destination+logo.filename) ) { 
           code = 0;
        }
        io.emit('logo', {
            data: {
                code: code
            }
        })
    }); 
    return promise; 
 }; 

// ffmpeg -y -i 1.jpg -vf scale=w=1920:h=1080:force_original_aspect_ratio=increase 1_resized.jpg &&
// ffmpeg -y -i 1_resized.jpg -vf  "crop=1920:1080:0:0" 1_resized_crop.jpg &&
// ffmpeg -y -loop 1 -i 1_resized_crop.jpg -i testLogo.png -filter_complex "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" -i "./download/test.mp3" -shortest -c:v libx264 -c:a copy ./output/1.mkv

let resizePhoto = function(data) {
    // console.log("audio0 margeVideoAudio:" + data.audio);
    // console.log("video0 margeVideoAudio:" + data.video);
    // console.log("logo0 margeVideoAudio:" + data.logo);
    var promise = new Promise(function (resolve, reject) {
        shell.exec(`ffmpeg -y -i "./${data.video}" -vf scale=w=1920:h=1080:force_original_aspect_ratio=increase "./${data.video}_resized".jpg`, function(code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            // io.emit('makevideo', {
            //     data: {
            //         code: code,
            //         stdout: stdout,
            //         stderr: stderr,
            //         filename: filename
            //     }
            // })
            let newData = {
                audio: data.audio,
                video: `${data.video}_resized`,
                logo: data.logo
            }
            resolve(newData); 
          });
    }); 
    return promise; 
 }; 

 let cropVideo = function(data) {
    console.log("audio1 margeVideoAudio:" + data.audio);
    console.log("video1 margeVideoAudio:" + data.video);
    console.log("logo1 margeVideoAudio:" + data.logo);
    var promise = new Promise(function (resolve, reject) {
        shell.exec(`ffmpeg -y -i ${data.video}.jpg -vf  "crop=1920:1080:0:0" ${data.video}_crop.jpg`, function(code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            // io.emit('makevideo', {
            //     data: {
            //         code: code,
            //         stdout: stdout,
            //         stderr: stderr,
            //         filename: filename
            //     }
            // })
            let newData = {
                audio: data.audio,
                video: `${data.video}_crop`,
                logo: data.logo
            }
            resolve(newData); 
          });
    }); 
    return promise; 
 }; 

 let margeVideoAudio = function(data) {
    console.log("audio2 margeVideoAudio:" + data.audio);
    console.log("video2 margeVideoAudio:" + data.video);
    console.log("logo2 margeVideoAudio:" + data.logo);
    let filename = randomstring.generate()
    if (!shell.test('-d', './output/')) {
        shell.mkdir('./output/');
    }
    var promise = new Promise(function (resolve, reject) {
        shell.exec(`ffmpeg -y -loop 1 -i ./${data.video}.jpg -i ./"${data.logo}" -filter_complex "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" -i "./download/${data.audio}.mp3" -shortest -c:v libx264 -c:a copy ./output/"${data.audio+filename}".mkv`, function(code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            io.emit('makevideo', {
                data: {
                    code: code,
                    stdout: stdout,
                    stderr: stderr,
                    filename: `${data.audio+filename}`
                }
            })
            let newData = {
                audio: data.audio,
                video: data.video,
                logo: data.logo
            }
            resolve(newData); 
          });
    }); 
    return promise; 
 }; 