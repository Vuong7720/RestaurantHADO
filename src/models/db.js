const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://userConnect:user123@atlascluster.emgnhic.mongodb.net/serverHADO?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose;