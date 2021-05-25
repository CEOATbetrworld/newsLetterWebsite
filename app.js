const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/93191b34b0";

    const options = {
        method: "POST",
        auth: "dhruv:aefdcb24b0e3bbfd7ec4998bcca78407-us6",
    }



    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end()


})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
})

// aefdcb24b0e3bbfd7ec4998bcca78407-us6

// 93191b34b0