const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const shell = require('shelljs');

const PORT = 8081

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/mp3', (req, res) => {
    let url = req.body.data.url;
    console.log(url);
    downloadMp3(url);
    res.json({
        data: 'start downloadMp3(url)'
    })
});

// youtube-dl

const downloadMp3 = function(url) {
    let promise = new Promise(function (resolve, reject) {
        shell.exec(`youtube-dl --extract-audio --audio-format mp3 -o "./download/%(title)s.%(ext)s" ${url}`, function(code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
          });


    //    setTimeout(function () {
    //      console.log('first method completed'); 
    //      io.emit('process1',  {'status':1, 
    //       'message':'DATAfrom1'
    //       }); 
    //      console.log( {data:'DATAfrom1'}); 
    //      resolve( {data:'DATAfrom1'}); 
    //    }, 1000); 
    }); 
    return promise; 
 }; 

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))