const TransactionModel = require("../../../models/TransactionModel");
const { validationResult } = require('express-validator');


module.exports = {

getAllTransactions: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const transactions = await TransactionModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
      const count = await TransactionModel.countDocuments();

      res.status(200).json({  
        transactionsData:   transactions,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
},

getAllTransactionsSummary: async (req, res) => {
    const period = req.params.period;
    let groupBy;
    switch (period) {
      case 'yearly':
        groupBy = { year: { $year: '$dateTime' }, category: '$category' };
        break;
      case 'monthly':
        groupBy = { year: { $year: '$dateTime' }, month: { $month: '$dateTime' }, category: '$category' };
        break;
      case 'weekly':
        groupBy = { year: { $year: '$dateTime' }, week: { $week: '$dateTime' }, category: '$category' };
        break;
      default:
        return res.status(400).json({ message: 'Invalid period specified' });
    }

    try {
      const summary = await TransactionModel.aggregate([
        // { $match: { user_id: userId } },
        { $group: { _id: groupBy, totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.week': 1, '_id.category': 1 } }
      ]);

      res.status(200).json({ summary });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
},



  // Update user
createTransaction: async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const { title, description, amount, currency, dateTime, category, type,attachment } = req.body;
    const user_id = req.user.userId;
    if (new Date(dateTime) > new Date()) {
        return res.status(400).send('Transaction date cannot be in the future.');
    }
    const transaction = new TransactionModel({ title, description, amount, currency, dateTime, category, attachment, type,user_id });
    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction: transaction });
},

// Update user
getTransactionById: async (req, res) => {
    try {
      const user_id = req.user.userId;
      const transaction = await TransactionModel.findOne({_id : req.params.transactionId, user_id: user_id});
      console.log('transcation', transaction);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
},

// Update user
updateTransaction: async (req, res) => {
    try {
      const user_id = req.user.userId;
      const updatedTransaction = await TransactionModel.findByIdAndUpdate({_id : req.params.transactionId, user_id: user_id}, req.body, { new: true });
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(updatedTransaction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
},

// Update user
deleteTransaction: async (req, res) => {
    try {
        const user_id = req.user.userId;
        const deletedTransaction = await TransactionModel.findByIdAndDelete({_id : req.params.transactionId, user_id: user_id});
        console.log(deletedTransaction, 'dskdsakakdk');
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

}