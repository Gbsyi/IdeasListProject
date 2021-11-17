const {Schema, model, Types} = require('mongoose');

const schema = Schema({
    title: {type: String, required: true},
    text: {type: String, require: true},
    date: {type: Date, default: Date.now},
    isRealised: {type: Boolean, default: false},
    owner: {type: Types.ObjectId, ref: 'User'} 
});

module.exports = model('Idea', schema);