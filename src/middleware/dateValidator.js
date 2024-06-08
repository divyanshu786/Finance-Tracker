const dateValidator = (req, res, next) => {
    const { date } = req.body;
    const recordDate = new Date(date);
    const currentDate = new Date();
  
    // Strip time for comparison purposes
    recordDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    if (recordDate > currentDate) {
      return res.status(400).json({ message: 'Date cannot be in the future' });
    }
  
    next();
  };
  
  module.exports = dateValidator;
  