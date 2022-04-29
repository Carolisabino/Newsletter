const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({

 apiKey: "3b78927d2bac923578119e525e3d15a9-us17",

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


 res.sendFile(__dirname + "/success.html")
};


 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res){
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});


//3b78927d2bac923578119e525e3d15a9-us17

//list id
//89af7c8726
