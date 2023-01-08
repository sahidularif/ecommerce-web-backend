const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
const path = require("path");
const port = 5000 || process.env.PORT
const {routes } = require('./routes/auth.routes');
const { productRoute } = require('./routes/services');
const { stripe } = require('./routes/stripe.routes');
const { articleRoute } = require('./routes/article.route');
require('dotenv').config();

app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(bodyParser.json());

// Connect to  the Mongodb databases
require('./database')();


app.use('/auth', routes);
app.use('/stripe', stripe);
app.use('/product', productRoute);
app.use('/article', articleRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome" })
});


// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})


app.use((err, req, res, next) => {
    if (res.headersSent) {
        next()
    } else {
        if(err.message){
            res.status(500).send(err.message)
        } else {
            res.send('There was an error')
        }
    }
})