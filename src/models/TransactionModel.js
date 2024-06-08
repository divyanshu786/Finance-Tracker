// models/Task.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount:  { type: Number, required: true },
    currency: { type: String, required: true },
    dateTime: { type: Date, required: true },
    category: { type: String, required: true, enum: ['food', 'rent', 'salary', 'utilities', 'others']} ,
    attachment: { type: String }, // This will store the path to the file
    type: { type: String, enum: ['income', 'expense', 'saving'] },
    user_id : { type: String, required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);


