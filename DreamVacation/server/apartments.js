'use strict'

let express = require('express');
let app = express.Router();
let nodemailer = require('nodemailer');

const mongoClient = require("mongodb").MongoClient
const connectionString = "mongodb+srv://sari:sari1234@cluster0.rvloj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let aparts;
let db;

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const validation = require("./shared/validation");

let transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
        user: 'shop.server.js@gmail.com',
        pass: 'project8'
    }
});

mongoClient.connect(connectionString, { useUnifiedTopology: true }).then((client, err) => {
    if (err) return console.error(err)
    console.log('Connected')
    db = client.db("vacationData")
    aparts = db.collection("apartments")

    app.get("/", function (req, res) {
        aparts.find().toArray()
            .then(result => {
                res.send(result)
            })
            .catch(error => console.error(error))
    })

    app.get("/getone", function (req, res) {

        if (req.headers['content'] == null) res.send("missing id. fail")
        else {
            let id = req.headers['content'];
            aparts.findOne({ id: Number(req.headers['content']) })
                .then(result => { if (result) res.send(result) })
                .catch(error => console.error(error))
        }
    })

    app.post("/", function (req, res) {

        aparts.find().toArray()
            .then(result => {
                let id = result[result.length - 1].id + 1;
                let apartment = {
                    id: id,
                    location: req.body.location,
                    price_per_night: req.body.price_per_night,
                    price_per_shabat: req.body.price_per_shabat,
                    beds_num: req.body.beds_num,
                    additions: req.body.additions,
                    phone: req.body.phone,
                    email: req.body.email,
                    recommendations: [],
                    img: req.body.img
                }

                if (!validation.are_values_valid(apartment)) res.send("fail")

                aparts.insertOne(apartment)
                    .then(() => {

                        let mailOptions = {
                            from: 'shop.server.js@gmail.com',
                            to: req.body.email,
                            subject: 'Dream Vacation שמר את הפרסום שלך',
                            text: 'דירת הנופש שפרסמת נכנסה לרשימת הדירות של האתר.'
                        }

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('sent email!')
                            }
                        })
                        res.send("success");
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => console.error(error))

    })

    app.put("/", function (req, res) {
        if (req.body.id == null) res.send("missing id. fail")
        else if (req.body.recommendations == null) res.send("missing rec. fail")
        else {
            aparts.findOneAndUpdate(
                { id: req.body.id },
                {
                    $set: {
                        recommendations: [req.body.recommendations],
                    }
                },
                {
                    upsert: true
                }
            )
                .then(() => res.send("success"))
                .catch(error => console.error(error))
        }
    })
})

module.exports = app;