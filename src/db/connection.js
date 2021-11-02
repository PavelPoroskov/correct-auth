const mongoose = require('mongoose');

const connectDb = async () => {
  const {
    MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB,
  } = process.env;
  const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;

  try {
    const con = await mongoose.connect(
      MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log(`MongoDb connected ${con.connection.host}`);
  } catch (err) {
    console.log(`Failed to connect to the database ${err}`);
    process.exit(1);
  }
};

module.exports = {
  connectDb,
};
