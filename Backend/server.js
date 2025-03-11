if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}
const express = require('express');
const DBSQL = require('./DB/mysqlDB'); 
const app = express();
app.use(express.json());
const port = 8080;
const cors = require('cors');
app.use(cors());

require('./model/mysqlSchema.js'); 
require('./seedDB.js')

app.get('/', (req, res) => {
  DBSQL.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
      return res.status(500).send('MySQL connection failed');
    }

    res.send('Connected to MySQL Database');
  });
});

app.get('/ping',(request,response)=>{
    response.send('Hello World!');
});

app.use('/user-router',require('./routes/users.routes.js'));
app.use('/poem-router',require('./routes/poems.routes.js'))

app.listen(port, () => {
  console.log(`Your server is running on http://localhost:${port}`);
});