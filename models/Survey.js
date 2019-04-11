const mongoose = require('mongoose');
const {Schema} = mongoose;
const Recipient = require('./Recipient');

const surveyShema = new Schema({
    title:String,
    subject:String,
    recipients:[Recipient],
    body:String,
    _user:{type:Schema.Types.ObjectId,ref:'User'},
    yes : {type:Number, default:0},
    no:{type:Number, default:0},
    dateSend:Date,
    dateResponded:Date
});

mongoose.model('surveys', surveyShema);