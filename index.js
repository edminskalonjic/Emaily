const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');
const CookieSession = require('cookie-session');
require('./models/User');
require('./models/Survey');
require('./services/passport');


const app = express();

mongoose.connect(keys.mongoUri, {useNewUrlParser:true}, (err)=> {
    if(err){
        console.log('error');
    }
});

app.use(bodyParser.json());

app.use (CookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, resp) => {
        resp.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);