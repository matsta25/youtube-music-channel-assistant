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
    makevideo(audio, video, logo);
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

// ffmpeg -i 1.jpg -vf scale=w=1920:h=1080:force_original_aspect_ratio=increase 1_resized.jpg &&
// ffmpeg -i 1_resized.jpg -vf  "crop=1920:1080:0:0" 1_resized_crop.jpg &&
// ffmpeg -loop 1 -i 1_resized_crop.jpg -i testLogo.png -filter_complex "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" -i "./download/test.mp3" -shortest -c:v libx264 -c:a copy ./output/1.mkv