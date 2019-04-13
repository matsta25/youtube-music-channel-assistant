const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const shell = require('shelljs');

const PORT = 8081

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/mp3', (req, res) => {
    let url = req.body.data.url;
    console.log(url);
    downloadMp3(url);
    res.json({
        data: 'start downloadMp3(url)'
    })
});

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
