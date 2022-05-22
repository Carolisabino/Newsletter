const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
// --------------------MAILCHIMP CONFIGURATIONS----------------------\\
mailchimp.setConfig({

 apiKey: process.env.API_KEY,

 server: "us17"
});

app.post("/", function (req,res) {

const firstName = req.body.fName;
const secondName = req.body.lName;
const email = req.body.email;
const listId = "89af7c8726";

const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};

 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
// --------------------ED OF MAILCHIMP CONFIGURATIONS----------------------\\


// --------------------SUCESSFULL REGISTRATION----------------------\\
 res.sendFile(__dirname + "/success.html")
 console.log("secess");
};

// --------------------IF FAILURE REDIRECT TO HOMEPAGE----------------------\\

 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res){
  res.redirect("/")
});

// --------------------SERVER----------------------\\

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
