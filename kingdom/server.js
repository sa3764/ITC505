const express = require('express')
const logger = require('morgan')
const path = require('path')

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(logger('dev'))

// Random test route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Serve all static files from "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// 🌊 Underwater Kingdom Mad Lib Route
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { name, adjective, animal, place, verb } = req.body

  // Validate form input
  if (!name || !adjective || !animal || !place || !verb) {
    return res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/ITC505/lab-7/style.css" />
        </head>
        <body>
          <h1>Submission Failed 🪸</h1>
          <p>Please fill out <strong>all fields</strong> to create your story!</p>
          <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        </body>
      </html>
    `)
  }

  // Generate the Mad Lib story
  const madLib = `
    <html>
      <head>
        <title>🌊 Underwater Kingdom Story</title>
        <link rel="stylesheet" href="/ITC505/lab-7/style.css" />
      </head>
      <body>
        <h1>🐠 Your Underwater Kingdom Story 🌊</h1>
        <div class="story-box">
          <p>Deep under the ocean, <strong>${name}</strong> discovered a <strong>${adjective}</strong> kingdom near <strong>${place}</strong>.
          A friendly <strong>${animal}</strong> swam up and invited them to <strong>${verb}</strong> all day long.
          From that moment on, <strong>${name}</strong> became the hero of the Underwater Kingdom — where adventure and laughter float in every bubble!</p>
        </div>
        <a href="/ITC505/lab-7/index.html" class="back-btn">🌊 Make Another Story</a>

        <!-- Floating bubbles -->
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </body>
    </html>
  `
  res.send(madLib)
})

// Default port setup
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`))



