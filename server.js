
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var fs = require('fs');
var contacts = fs.readFileSync('contacts.json');
// var contactList = JSON.parse(contacts);
// console.log(contacts)

var contactList = JSON.parse(contacts);
console.log(contactList);

// var contactListReturn = JSON.stringify(contacts);
// fs.writeFile('contacts.json', contactListReturn, finished);
//   function finished(err){
//     console.log('Okay');
//   }

const DEFAULT_PORT = 3377
const port = process.env.PORT || DEFAULT_PORT

function readContactFile() {
  var contacts = fs.readFileSync('contacts.json');
  //read readFile
  //loop through the JSON that you just readme
  //turn data into an array
  //then res.send the array
}

function editContact(){

}

// Serve up content from public directory
app.use(express.static(__dirname + '/'));

console.log(`Server listening at port ${port}`)
app.listen(port);


//get route
app.get("/test", function(req, res) {
  contacts = fs.readFileSync('contacts.json');
  contactList = JSON.parse(contacts);
  console.log(contactList);

res.send(contactList);
})


//post route
app.post("/test", function(req, res){
  var updatedContactList = req.body.contactList;
  console.log(req.body);
  console.log('post success')
  res.send("post success");
  fs.writeFile('contacts.json',JSON.stringify(updatedContactList, null, 2), finished);

  function finished(err) {
    console.log('finished')
  }
})
//
// app.locals.contactList = require('./contacts.json');
