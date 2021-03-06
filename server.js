const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to ContactKeeper API ...' })
);

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/authUser', require('./routes/authUser'));
app.use('/api/authAdmin', require('./routes/authAdmin'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
