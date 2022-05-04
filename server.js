require('dotenv').config({ path: '.env' })
require('events').EventEmitter.defaultMaxListeners = 15;
var express = require('express')
var mongoose = require('mongoose')
var cors = require("cors");
bodyParser = require('body-parser')
const expFileUpload = require('express-fileupload')

port = process.env.PORT || 8000

app = express()
app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}));
  
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(expFileUpload())

mongoose.Promise = global.Promise
console.log('test: ', process.env.DATABASE)
mongoose.connect(process.env.DATABASE, function(err){
    console.error('mongoose connect issue', err)
})

// Nft Table
Nft = require('./api/models/nftModel')
var nftRoutes = require('./api/routes/nftRoutes')
nftRoutes(app)

// User Table
User = require('./api/models/userModel')
var userRoutes = require('./api/routes/userRoutes')
userRoutes(app)

// Offer Table
Offer = require('./api/models/offerModel')
var offerRoutes = require('./api/routes/offerRoutes')
offerRoutes(app)

// Cluster Table
Cluster = require('./api/models/clusterModel')
var clusterRoutes = require('./api/routes/clusterRoutes')
clusterRoutes(app)

app.listen(port)

console.log('RESTful API server started on: ' + port)
