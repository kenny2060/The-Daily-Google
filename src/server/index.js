const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const AylienNewsApi = require('aylien-news-api')
const AYLIENTextAPI = require('aylien_textapi')
// Setup empty JS object to act as endpoint for all routes
const projectData = []

const app = express()
// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(express.static('dist'))


app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, () => {
    console.log(`Running on Localhost: 8081`)
})

const defaultClient = AylienNewsApi.ApiClient.instance

let app_id = defaultClient.authentications['app_id']
app_id.apiKey = process.env['NEWSAPI_APP_ID']

let app_key = defaultClient.authentications['app_key']
app_key.apiKey = process.env['NEWSAPI_APP_KEY']

const apiInstance = new AylienNewsApi.DefaultApi()

const textApi = new AYLIENTextAPI({
    application_id: process.env['NEWSAPI_APP_ID'],
    application_key: process.env['NEWSAPI_APP_KEY']
})

app.post('/userNews', (req, res) => {
    let stories = null;
    let userInput = req.body.userInput
    const opts = {
        title: '"' + userInput + '"',
        sortBy: "social_shares_count.facebook",
        language: ["en"],
        publishedAtStart: "NOW-7DAYS",
        publishedAtEnd: "NOW",
    }
    apiInstance.listStories(opts, (error, data, response) => {
        if (error) {
            console.error('GET Stories failed: ', error)
        } else {
            console.log("API called successfully.")
            // console.log("========================================")
            // for (let i = 0; i < data.stories.length; i++) {
            //     console.log(data.stories[i].sentiment.body.polarity)
            // }
            stories = data.stories
            // @ProjectData would be used to pool multiple APIs
            projectData.push(stories)
            res.send(stories)
        }
    })
})
// Exported for Jest testing (app.listen)
module.exports = app