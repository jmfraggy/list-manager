const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/auth
// @desc        Auth user, and get token
// @access      Public
router.post('/', [
    // email must be an email
    body('email', 'Valid email is required').isEmail(),
    // password must be at least 7 chars long
    body('password', 'Password is required').exists()
],
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            // Query to find email existence
            let user = await User.findOne({ email });
            // Invalid Email
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }
            // Compare the password with bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            // Invalid Password
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Generate payload for jwt
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Generate a jwt
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 7200
            }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    });

module.exports = router;