const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const CookieSession = require('cookie-session');
require('./models/User');
require('./services/passport');


const app = express();

mongoose.connect(keys.mongoUri, {useNewUrlParser:true}, (err)=> {
    if(err){
        console.log('error');
    }
});

app.use (CookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);