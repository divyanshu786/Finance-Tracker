const express = require("express");
const router = express.Router();
const app = express();
const authMiddleware = require("../middleware/auth");
const { validationResult } = require('express-validator');
const { validateRegistration, validateLogin } = require('../middleware/authValidator'); 
const dateValidator = require('../middleware/dateValidator');
const {transactionValidator} = require('../middleware/transactionValidator.js');
const multer = require('multer');
const upload = require('../upload.js');

const userController = require("../controllers/Api/V1/UserController");
const transactionController = require('../controllers/Api/V1/TransactionController');


router.post("/user/register",validateRegistration,  (req, res) => {userController.register(req, res);});
router.post("/user/login", validateLogin,  (req, res) => {userController.login(req, res);});

router.post('/transaction/', authMiddleware,transactionValidator, dateValidator, (req, res) => {transactionController.createTransaction(req, res);});
router.get('/transaction/:transactionId' ,authMiddleware,  (req, res) => {transactionController.getTransactionById(req, res);});
router.delete('/transaction/:transactionId' ,authMiddleware ,  (req, res) => {transactionController.deleteTransaction(req, res);});
router.put('/transaction/:transactionId', authMiddleware,   (req, res) => {transactionController.updateTransaction(req, res);});
router.get('/transactions/', authMiddleware, (req, res) => {transactionController.getAllTransactions(req, res);});
// Get summary and analytics
router.get('/transaction/summary/:period', authMiddleware,  (req, res) => {transactionController.getAllTransactionsSummary(req, res);});


// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (req.file) {
            res.status(200).json({
                message: 'File uploaded successfully',
                file: req.file
            });
        } else {
            res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;