var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const dbUrl = "mongodb://localhost:27017/stattrackerDB";

