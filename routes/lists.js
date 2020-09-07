const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const List = require('../models/List');

// @route       GET api/lists
// @desc        Get all users lists
// @access      Private
// Second parammeter (auth) to make it protected
router.get('/', auth, async (req, res) => {
    try {
        const lists = await List.find({ user: req.user.id }).sort({ date: -1 });
        res.json(lists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

// @route       POST api/lists
// @desc        Add new list
// @access      Private
router.post('/', [auth, [
    body('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, subList } = req.body;

    try {
        const newList = new List({
            user: req.user.id,
            name,
            subList
        });

        const list = await newList.save();
        res.json(list)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/lists/:id
// @desc        Update list
// @access      Private
router.put('/:id', auth, async (req, res) => {
    const { name, subList } = req.body;
    // Build list object
    const listFields = {};
    if (name) listFields.name = name;
    if (subList) {
        listFields.subList = [...subList];
    } 
    try {
        // Find List by ID
        let list = await List.findById(req.params.id); 
        if (!list) return res.status(404).json({ msg: 'List not found' });
        // Make sure user owns list
        if (list.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        list = await List.findByIdAndUpdate(req.params.id,
            { $set: listFields },
            { new: true });
        
        res.json(list);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route       DELETE api/lists/:id
// @desc        Delete list
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let list = await List.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'List not found' });

        // Make sure user owns list
        if (list.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Remove List
        await List.findByIdAndRemove(req.params.id)
        res.json({ msg: 'List Deleted' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    
});

// @route       DELETE api/lists/:id/:index
// @desc        Delete SubList of list
// @access      Private
router.delete('/:id/:index', auth, async (req, res) => {
    try {
        let list = await List.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'List not found' });

        // Make sure user owns list
        if (list.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        // Remove Sub-list
        const listFields = {};
        listFields.subList = list.subList.filter((el, index) => index !== parseInt(req.params.index));

        list = await List.findByIdAndUpdate(req.params.id,
            { $set: listFields },
            { new: true });
        
        res.json(list);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
    
});

module.exports = router;