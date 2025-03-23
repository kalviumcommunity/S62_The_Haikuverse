const express = require('express');
const cookieParser = require('cookie-parser');
const DBSQL = require('./DB/mysqlDB');
const connectDatabase = require('./DB/database.js'); 
const Users = require('./model/userSchema.js'); 
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken")

const app = express();
const port = 8080;
app.use(express.json());
app.use(cookieParser()); // Middleware to handle cookies
app.use(require('cors')());

// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
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

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: 'No token provided, authorization denied' });
  }
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Add decoded user data to request
    next();
  });
};

// Login endpoint - Generate and store JWT token
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email|| !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user from your DB (e.g., MongoDB or MySQL)
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare password (use bcrypt to hash and compare)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Set token in the cookie
    res.cookie('token', token, {
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

// Logout endpoint - Clear JWT token
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

// Protected Route example: To access this route, the user needs to be logged in and have a valid token
app.get('/profile', verifyToken, (req, res) => {
  // Access the user data stored in the JWT
  res.json({ message: 'Protected Profile Data', user: req.user });
});

app.use('/user-router', require('./routes/users.routes.js'));
app.use('/poem-router', require('./routes/poems.routes.js'));

app.listen(port, () => {
  console.log(`Your server is running on http://localhost:${port}`);
});