require('dotenv').config();
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(fileUpload());

app.use(express.static('client/build'));
app.use('/images', express.static(path.resolve(__dirname, 'static')));

app.use('/api', require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
