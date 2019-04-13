const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');

const PORT = 8081

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/mp3', (req, res) => {
    let url = req.body.url;
    res.json({
        data: url
    })
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))