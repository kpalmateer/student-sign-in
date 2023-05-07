// create a route for getting all students
let express = require('express')

// by default if you require a directory, it will pull from index.js
let db = require('../models')

// pull in Student model
let Student = db.Student

// build a router
let router = express.Router()

// create a router to get info from the database
// a request to students will run the function defined
// this function will return the json of the students in order of presence then starID
router.get('/students', function (req, res, next) {
    Student.findAll( {order: ['present', 'starID'] }).then( students => {
        return res.json(students)
        // handle errors
    }).catch( err => next(err) )
})

// create a router to post (add) to the database
router.post('/students', function (req, res, next) {
    // req.body contains json that the Vue client sent in the request
    Student.create( req.body ).then( data => {
        // a response is required, in this case we'll send a confirmation or error message
        // 201 is a status code (like 404 or 500) used to indicate that something was created
        return res.status(201).send('ok')
        // handle user errors (missing or duplicated starID, etc)
    }).catch( err => {
        if ( err instanceof db.Sequelize.ValidationError ) {
            // respond with a 400 Bad Request error code, include error messages
            let messages = err.errors.map( e => e.message )
            // return a JSON array of sequelize validation errors
            return res.status(400).json(messages)
        }
        // handle other errors
        return next(err)
    })
})

// add code to edit a student
// this will match any request to students/X and make it available in the function
router.patch('/students/:id', function (req, res, next) {
    // if request is to students/100, studentID will be 100
    let studentID = req.params.id
    // req.body is the data sent with the request
    let updatedStudent = req.body
    // update the student that matches
    Student.update( updatedStudent,
        // update the row that matches the studentID
        { where: { id: studentID } } )
        // then will return an arry of the number of rows modified
        .then( (rowsModified) => {
            // create a variable for the number of rows modified
            let numberOfRowsModified = rowsModified[0]

            // if one row was modified (expected behavior), return the ok message
            if (numberOfRowsModified == 1) {
                return res.send('ok')
            } else {
                return res.status(404).json('Student with that id not found')
            }
        })
        .catch( err => {
            // if validation error, tell the user bad request
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map( e => message)
                return res.status(400).json(messages)
            } else {
                return next(err)
            }
        })
})

// create a route to delete students
router.delete('/students/:id', function (req, res, next) {
    // request the ID
    let studentID = req.params.id
    Student.destroy( { where: {id: studentID} } )
        .then( (rowsModified) => {
            if (rowsModified == 1) {
                return res.send('ok')
            } else {
                return res.status(404).json('Not found')
            }
            // respond w/ an ok message
        })
        // pass the error to the error handler
        .catch( err => next(err) )
})

// make the router available to the rest of the program
// this must be the last line in the router file
module.exports = router