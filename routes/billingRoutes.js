const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports =  (app) => {

    app.post('/api/stripe',requireLogin, async (req, resp) => {

        const charge = await stripe.charges.create({
            
            description:"$5 for 5 credits",
            amount: 500,
            currency: 'usd',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();
        resp.send(user);
    })
}