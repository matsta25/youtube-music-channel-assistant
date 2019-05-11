const Youtube = require("youtube-api")
const fs = require("fs")
exports.sendToYoutube = function (data) {
    let promise = new Promise(function (resolve, reject) {

        Youtube.authenticate({
            type: "oauth",
            token: data.accessToken
        })

        Youtube.videos.insert({
            resource: {
                snippet: {
                    title: data.path
                  , description: "Test video upload via YouTube API"
                }
              , status: {
                    privacyStatus: "private"
                }
            }
          , part: "snippet,status"
          , media: {
                body: fs.createReadStream('./dist'+data.path)
            }
        }, (err, data) => {
            if(err){
                console.log("err: "+err)
                code = 1
            }
            else if( data.status.uploadStatus === "uploaded" ){
                console.log("DONE :" + JSON.stringify(data))
                code = 0
            }
            io.emit('sendToYoutube', {
                data: {
                    code: code,
                    // stdout: stdout,
                    // stderr: stderr
                }
            })
        });


    })
    return promise;
}