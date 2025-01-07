if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}
const express = require('express');
const connectDatabase = require('./DB/database.js');

const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;



app.get('/', (req, res) => {
  // Check the connection status
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected';

  // Send the status as a response
  res.send(`Database Connection Status: ${dbStatus}`);
});

app.get('/ping',(request,response)=>{
    response.send('Hello World!');
});

app.listen(port,()=>{
    connectDatabase();
    console.log(`Your server is running on http://localhost:${port}`);
});