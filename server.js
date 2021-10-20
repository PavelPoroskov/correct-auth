const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const { connectDb } = require('./src/db/connection');
const { rootRoutes } = require('./src/routes');

dotenv.config({ path: 'config.env' });
const { PORT } = process.env;

connectDb();
const app = express();
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(path.join(__dirname, '/src/assets/css')));
app.use('/js', express.static(path.join(__dirname, '/src/assets/js')));
app.use('/img', express.static(path.join(__dirname, '/src/assets/img')));

app.use('/', rootRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}`);
});
