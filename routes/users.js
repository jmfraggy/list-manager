const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST api/users
// @desc        Register a User
// @access      Public
router.post('/', [
    // name is required
    body('name', 'Name is required').not().isEmpty(),
    // email must be an email
    body('email', 'Valid email is required').isEmail(),
    // password must be at least 7 chars long
    body('password', 'Password with 7 or more characters is required').isLength({min: 7})
], 
async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Query to find email existence
        let user = await User.findOne({ email }); 
        if(user) {
            return res.status(400).json({ msg: 'User already exists' }); 
        }
        user = new User({
            name,
            email,
            password
        });

        // Generate the salt for the encryption
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        user.password = await bcrypt.hash(password, salt);

        await user.save();
    
        res.send('User saved');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;