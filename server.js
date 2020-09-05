const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect MongoDB
connectDB();

app.get('/', (req, res) => 
res.json({ msg: 'Welcome to the List Manager API...' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lists', require('./routes/lists'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server Started on port ${PORT}`) });