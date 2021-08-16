const app = require("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.json(({ limit: "50mb", extended: true })));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true }));
app.listen(27017,function () {
    console.log("success");
})

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors());
app.use('/apartments', require('./apartments.js'));
app.use('/tips', require('./tips.js'));
