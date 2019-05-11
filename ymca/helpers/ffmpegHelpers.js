const shell = require('shelljs')

exports.resizePhoto = function(data) {
    var promise = new Promise(function (resolve, reject) {
        shell.exec(`ffmpeg -y -i "${data.video}" -vf scale=w=1920:h=1080:force_original_aspect_ratio=increase "./${data.video}_resized".jpg`, function(code, stdout, stderr) {
            let newData = {
                audio: data.audio,
                video: `${data.video}_resized`,
                logo: data.logo
            }
            resolve(newData); 
          })
    })
    return promise; 
 }

 exports.cropVideo = function(data) {
    var promise = new Promise(function (resolve, reject) {
        shell.exec(`ffmpeg -y -i ${data.video}.jpg -vf  "crop=1920:1080:0:0" ${data.video}_crop.jpg`, function(code, stdout, stderr) {
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

 exports.margeVideoAudio = function(data) {
    let tail = data.audio.length - 4
    let filename = data.audio.substring(12, tail)
    if (!shell.test('-d', './output/')) {
        shell.mkdir('./output/');
    }
    var promise = new Promise(function (resolve, reject) {
        shell.exec(`ffmpeg -y -loop 1 -i ${data.video}.jpg -i "${data.logo}" -filter_complex "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2" -i "${data.audio}" -shortest -c:v libx264 -c:a copy output/"${filename}".mkv`, function(code, stdout, stderr) {
            io.emit('makeVideo', {
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