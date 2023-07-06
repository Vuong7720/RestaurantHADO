const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1:27017/serverHADO';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose;