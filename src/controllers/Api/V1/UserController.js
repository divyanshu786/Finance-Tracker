const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const UserModel = require("../../../models/UserModel");


module.exports = {

login: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        // Find user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' , error: error});
    }
},


  // Update user
register: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { firstname, lastname, email, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const checkUserExist = await UserModel.findOne({ email: email});
        if(checkUserExist){
            return res.status(409).json({ message: 'User already exists with this email' });
        }
        const user = new UserModel({ firstname, lastname, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' , error: error});
    }
},

};