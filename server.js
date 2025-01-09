if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}
const express = require('express');

const { getDB, connection } = require('./DB/mongo-client.js');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;



app.get('/', async (req, res) => {
  // Check the connection status
  const checkStatus = await connection.connect();
  const readyState = connection.topology.isConnected()
    ? 'connected'
    : 'disconnected';

  // Send the status as a response
  res.send(`Database Connection Status: ${readyState}`);
});

app.get('/ping',(request,response)=>{
    response.send('Hello World!');
});

app.use('/user-router',require('./routes/routes.js'));

app.listen(port,()=>{
    // connectDatabase();
    console.log(`Your server is running on http://localhost:${port}`);
});