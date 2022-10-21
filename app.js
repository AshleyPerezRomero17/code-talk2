
// Coding Problem 4

// Key Notes:
// Node.js is a platform that lets you run javascript.
// Express is a framework that offers pre-built code for different areas and different 
// purposes in software development.
// It's a layer built on the top of the Node js that helps manage servers and routes. 
// Servers help take the user to the page they request. Routes use an http request method, 
// a url, and a function to make requests.
// The most commonly used HTTP request methods are GET, POST, PUT, PATCH, and DELETE.
// GET is used to request data from a specified resource.
// POST is used to send data to a server to create/update a resource.
// PUT is used to send data to a server to create/update a resource.
// The PATCH method is used to apply partial modifications to a resource.
// The DELETE method deletes the specified resource.

// validation.js
// exports basically allow you to use this code elesewhere in your program
// This file basically is creating validation for signups and login using express-validator
// check(field, message) Creates a validation chain for one or more fields
// not() Negates the result of the next validator.
// isEmpty() Checks if the input is empty is not true 
// isEmail() Checks if the input is an email 
// normalizeEmail() normalizes the email by correcting its format if it was entered 
// incorrectly for example removing a plus sign.
// isLength() compares length to validation passed in 
// for example password isLength({ min: 6 }) would not pass validation if the password is less than
//  5 characters because we are setting min: 6
exports.signupValidation = [
   check('name', 'Name is required').not().isEmpty(), // checks name field is not empty. if it is it 
   //   displays message 'Name is required'
   check('email', 'Please include a valid email').isEmail().normalizeEmail({
      gmail_remove_dots: true
   }),
   // checks email field is an email and normalizes it. if it is not an email message 'Please include a 
   //   valid email'
   check('password', 'Password must be 6 or more characters').isLength({
      min: 6
   }) // Checks the length of
   //    password field if its less than 6 characters  message 'Password must be 6 or more characters'
]
exports.loginValidation = [
   check('email', 'Please include a valid email').isEmail().normalizeEmail({
      gmail_remove_dots: true
   }),
   //    gmail_remove_dots: true: Removes dots from the local part of the email address, as GMail ignores 
   // them 
   // for example "john.doe" and "johndoe" are considered equal.

   // checks password is at least 6 characters in length 
   check('password', 'Password must be 6 or more characters').isLength({
      min: 6
   })
]


// Server.js file
const createError = require('http-errors'); // you are storing the package http-errors in a variable
//  called create errors
// An npm package is a file or folder that holds logic typically in the form of Modules.
const express = require('express');
// you are storing the package express in a variable
//  called express
const path = require('path');
// you are storing the package path in a variable
//  called path
const bodyParser = require('body-parser');
// you are storing the package body-parser in a variable
//  called bodyParser

const cors = require('cors');
// you are storing the package cors in a variable
//  called cors
const {
   signupValidation,
   loginValidation
} = require('./validation.js'); // this line pulls exported validation 
// logic from our validation file so that you can call it in server.js. 
// Require is a way to import that file.
const { check} = require('prettier');
// you are calling the check function using curly braces, from the package prettier.
const {builtinModules} = require('module');
const { request } = require('http');
// you are calling the builtinModules function using curly braces, from the package module.
const app = express(); // calling express creates an object that will be stored in app. 

// when making a request,and youre expecting json format you use .json to parse that payload.
// Payload is the data thats being passed when you make a request.
// parse looks through returned data and verifies its using the correct syntax.
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // this is middleware for parsing bodies that are returned from a URL
   // middleware is any software or service that enables the parts of a system to communicate 
   // and manage data
   extended: true //   extended true will allow for any value type not just strings.
}));
app.use(cors()); // this is using the cors function for app

// .get represents a get http request
// the slash represents the home page
// req stands for request, res stands for response
// we are using an arrow function since we are only returning one statement.
// when a get request is made to the homepage we want to respond "Node js file upload rest apis"
app.get('/', (req, res) => {
   res.send('Node js file upload rest apis');
});

// .post represents a post http request
// register represents the register page
// we are calling signupvalidation when a user registers an account
// if the current middleware function does not end the request response cycle it must call next()to 
// pass control to the next middleware function
app.post('/register', signupValidation, (req, res, next) => {});

// login represents the login page
// we are calling loginvalidation when a user logs into an account
app.post('/login', loginValidation, (req, res, next) => {});

// we are passing parameters to an arrow function to handle an error
app.use((err, req, res, next) => {
   //we are storing 500 as the status code
   err.statusCode = err.statusCode || 500;
   //we are storing "internal server error" as the error message  
   err.message = err.message || "Internal Server Error";
   // when you get a 500 error you want to send the message "Internal Server Error
   res.status(err.statusCode).json({
      message: err.message,
   });
});

// App is set to run on port 3000 so if you ran this locally it would be
http: //localhost:3000/ and you would see "Server is running on port 3000" in the console.
app.listen(3000, () => console.log('Server is running on port 3000'));