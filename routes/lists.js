const express = require('express');
const router = express.Router();

// @route       GET api/lists
// @desc        Get all users lists
// @access      Private
router.get('/', (req, res) => {
    res.send('Get all lists');
});

// @route       POST api/lists
// @desc        Add new list
// @access      Private
router.post('/', (req, res) => {
    res.send('Add list');
});

// @route       PUT api/lists/:id
// @desc        Update list
// @access      Private
router.put('/:id', (req, res) => {
    res.send('Update list');
});

// @route       DELETE api/lists/:id
// @desc        Delete list
// @access      Private
router.delete('/:id', (req, res) => {
    res.send('Delete list');
});

module.exports = router;