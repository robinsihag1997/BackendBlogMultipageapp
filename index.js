// import 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session')

const frontRoutes = require('./routes/front.route');
const backendRoutes = require('./routes/backend.route');


// app instance
const app = express();

// middleware
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'blog',
    resave: false,
    saveUninitialized: false
}))

// connect database
mongoose.connect('mongodb://127.0.0.1:27017/wd11blog')
    .then(() => {
        console.log("database connection established");
    })
    .catch(err => {
        console.log(err);
    })

// static files serve
app.use(express.static(path.join(__dirname, 'public')))

// view
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "./views/partials"))

// routes
app.use('/admin', backendRoutes);
app.use(frontRoutes);

// PORT
const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
    console.log(`server listening on port ${PORT}`);
})