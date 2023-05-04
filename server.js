// require express
let express = require('express')

// require API routes to configure the web app
let api_routes = require('./routes/api')

// create web app
let app = express()

// enable express app to receive and use json and convert it to javascript
app.use(express.json())

// set all api requests to use the /api path
// enable app to use routes/respond to request via those routes
app.use('/api', api_routes)

// this code will run only if the above routes code doesn't run
app.use(function (req, res, next) {
    // respond to any request not covered in our routes
    res.status(404).send('Not found')
})

// add an error handler for server errors
app.use(function (err, req, res, next) {
    // display a stack trace
    console.error(err.stack)
    // show a message
    res.status(500).send('Server error')
})

// create server to run app
// process.env.PORT looks for an environment variable defining the port
// if it doesn't find one, 3000 is used instead
let server = app.listen(process.env.PORT || 3000, function () {
    // confirmation message
    console.log('Express server running on port ', server.address().port )
})