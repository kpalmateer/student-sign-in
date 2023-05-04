let { Sequelize, DataTypes }  = require('sequelize')

// environment variables are variables a computer stores
let env = process.env.NODE_ENV || 'development'  // set a default if no enviromment variable

console.log('using environment' + env)

let configFile = require(__dirname + '/../config.json')
let config = configFile[env]

let password = process.env.DB_PASSWORD  // undefined locally, not needed with sqlite
// we'll have to set the DB_PASSWORD environment variable at Azure
config.password = password

let db = {}

let sequelize = new Sequelize(config)

let studentModelCreate = require('./student')  // a function definition
let studentModel = studentModelCreate(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize  // sequelize configuration
db.Sequelize = Sequelize  // Sequelize library

module.exports = db

/*
// import the Sequelize and DataTypes libraries from sequelize
let { Sequelize, DataTypes } = require('sequelize')

// environment variables are variables stored on a computer
// this will set the environment to either the value of the NODE_ENV variable (if it exists)
// or the development environment (if it doesn't)
let env = process.env.NODE_ENV || 'development'

console.log('using environment' + env)

// load the config file
// will load the config as an object
let configFile = require(__dirname + '/../config.json')

// load the appropriate config file depending on the env variable
let config = configFile(env)

// set a password in the environment
let password = process.env.DB_PASSWORD // undefined locally (which is OK)

// DB_PASSWORD needs to be set to connect to Azure
config.password = password

// create a database object
let db = {}

// set up sequelize connection
// including the student model
let sequelize = new Sequelize(config)
let studentModelCreate = require('./student')
let studentModel = studentModelCreate(sequelize, DataTypes)

// make the student model available to the database
db[studentModel.name] = studentModel
db.sequelize = sequelize // sequelize configuration
db.Sequelize = Sequelize // Sequelize library

// make the database available to the rest of the program
module.exports = db*/
