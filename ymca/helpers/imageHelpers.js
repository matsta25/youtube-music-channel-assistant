const shell = require('shelljs')

exports.saveBackgroundImage = function (backgorundImage) {
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