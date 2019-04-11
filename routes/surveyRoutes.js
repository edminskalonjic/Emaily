const mongoose = require('mongoose');
const _ = require('lodash');
const {URL} = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const emailSurveyTemplate = require('../services/emailTemplate/emailSurveyTemplate');

const Survey = mongoose.model('surveys');

module.exports =  (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {       
        res.send('Thanks you for voting!');       
    });

    app.get('/api/surveys',requireLogin, async (req,res) => {
        const surveys = await Survey.find({_user:req.user.id})
        .select({recipients:false});
        res.send(surveys);
    });

    app.post('/api/surveys/webhooks', (req, res) => {
       _.map(req.body, async event => {
            const email = event.email;

            const pathname = new URL(event.url).pathname;
            const url = pathname.split('/');

            const surveyId = url[3];
            const choice = url[4];
            await Survey.updateOne({
                _id:surveyId,
                recipients: {
                    $elemMatch: {email:email, responded:false}
                } }, {
                    $inc : {[choice] : 1},
                    $set: {'recipients.$.responded':'true'},
                    dateResponded:new Date()     
            }).exec();
            
        }); 
        res.send({});               
    });
    

    app.post('/api/surveys', requireLogin, requireCredits, async(req, res) =>{

        const {title, subject, recipients, body} = req.body;
        const survey = await new Survey({
            title,
            subject ,
            body,
            recipients: recipients.split(',').map(email =>({email})),
            _user : req.user.id,
            dateSend:Date.now()
        }).save();

        const mail = new Mailer(survey, emailSurveyTemplate(survey));

        try{
            await mail.send();
            req.user.credits -=1;
            const user = await req.user.save();
            res.send(user);
        } catch(err){
            res.status(422).send(err);
        }
    });
}