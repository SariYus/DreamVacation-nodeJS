
let express = require('express');
let app = express();

const mongoClient = require("mongodb").MongoClient
const connectionString = "mongodb+srv://sari:sari1234@cluster0.rvloj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

let tips;
let db;

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected')
    db = client.db("vacationData")
    tips = db.collection("tips")
})

app.get("/", function (req, res) {
    tips.find().toArray()
        .then(result => { if (result) res.send(result) })
        .catch(error => console.error(error))
})

app.post("/", function (req, res) {

    if (req.body.id == undefined) res.send("fail")
    if (req.body.value == undefined) res.send("fail")

    let tip = {
        id: req.body.id,
        tip: req.body.value
    }

    tips.insertOne(tip)
        .then(() => {
            res.send("success");
        })
        .catch(error => console.error(error))
})

module.exports = app;