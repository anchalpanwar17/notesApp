const mongoose = require('./db');
const express = require('express');
var cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); //to use req.body

const auth = require('./routes/auth');
const notes = require('./routes/notes');

//Available routes
app.use('/api/auth', auth);
app.use('/api/notes', notes);

// app.get('/', (req, res) => {
//     res.send("this is home");
// });

app.listen(port, ()=> {
    console.log(`Backend listening on port ${port}`);
});