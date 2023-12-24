const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
const path = require("path");
const port = 5000 || process.env.PORT
const {routes } = require('./routes/auth.routes');
const { productRoute } = require('./routes/services');
require('dotenv').config();

app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(bodyParser.json());

// Connect to  the Mongodb databases
require('./database')();


app.use('/auth', routes);
app.use('/product', productRoute);

app.get("/", (req, res) => {
    res.json({ message: e })
});

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
  app.use(errorHandler);
// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})
