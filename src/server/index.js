const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const AylienNewsApi = require('aylien-news-api')
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

console.log(JSON.stringify(mockAPIResponse))

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.get('/test', (req, res) => {
    res.json(mockAPIResponse)
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

const opts = {
    title: '"Boris Johnson"',
    sortBy: "social_shares_count.facebook",
    language: ["en"],
    publishedAtStart: "NOW-7DAYS",
    publishedAtEnd: "NOW",
    // categoriesTaxonomy: 'iab-qag',
    // categoriesId: ['IAB15'],
    // entitiesBodyLinksDbpedia: [
    //     "http://dbpedia.org/resource/British_Airways"
    //   ]
}

app.get('/localNews', (req, res) => {
    let stories = null;
    apiInstance.listStories(opts, (error, data, response) => {
        if (error) {
            console.error('GET Stories failed: ', error)
        } else {
            console.log("API called successfully.")
            console.log("========================================")
            for (let i = 0; i < data.stories.length; i++) {
                console.log(data.stories[i].source.name)
            }
            stories = data.stories
            projectData.push(stories)
            res.send(stories)
        }
    })
})

app.post('/returnNews', (req, res) => {
    // console.log('POST /stories: ', req.body)
    let newsStories = {
        'title': req.body.title
    }
    projectData.push(newsStories)
    res.send(projectData)
    // console.log('Stories Data: ', projectData)
})

app.get('/updateUI', (req, res) => {
    res.send(projectData)
})