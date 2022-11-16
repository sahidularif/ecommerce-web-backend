const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000 || process.env.PORT
const {routes } = require('./routes/auth.routes');
const { productRoute } = require('./routes/services');
const { stripe } = require('./routes/stripe.routes');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to  the Mongodb databases
require('./database')();


app.use('/auth', routes);
app.use('/stripe', stripe);
app.use('/product', productRoute);

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