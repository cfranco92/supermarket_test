const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

async function connect(url) {
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });
  console.log('[db] succesfully connected');
}

module.exports = connect;