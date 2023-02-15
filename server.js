const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// console.log(process.env);

// SERVER SETUP & LISTENING
const port = process.env.PORT || 3060;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
