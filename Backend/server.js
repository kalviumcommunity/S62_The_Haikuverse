const express = require('express');
const cookieParser = require('cookie-parser');
const DBSQL = require('./DB/mysqlDB');
const connectDatabase = require('./DB/database.js'); 
const Users = require('./model/userSchema.js'); 
const bcrypt = require('bcryptjs'); 

const app = express();
const port = 8080;
app.use(express.json());
app.use(cookieParser()); // Middleware to handle cookies
app.use(require('cors')());

// Connect to the database (MongoDB)
connectDatabase();


app.get('/', (req, res) => {
  DBSQL.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
      return res.status(500).send('MySQL connection failed');
    }

    res.send('Connected to MySQL Database');
  });
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    res.cookie('username', username, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict', 
    });

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Logout successful' });
});

app.use('/user-router',require('./routes/users.routes.js'));
app.use('/poem-router',require('./routes/poems.routes.js'))

app.listen(port, () => {
  console.log(`Your server is running on http://localhost:${port}`);
});