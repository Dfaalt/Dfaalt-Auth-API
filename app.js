require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const {PORT} = process.env;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//default app.js
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// route utama default
app.get('/', (req, res, next)=> {
    res.send("welcome to Culinaryndo");
});

// Handling error default
app.use((req, res, next) => {
    res.status(404).json({
        status : false,
        message: "request not found",
        data: null,
    });
});

//Handling error db 500 default
app.use((req, res, next) => {
    res.status(404).json({
        status : false,
        message: err.message,
        data: null,
    });
});

app.listen(PORT,() => {
    console.log(`running on http://localhost:${PORT}`);
});