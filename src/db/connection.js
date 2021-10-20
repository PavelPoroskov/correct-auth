const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const con = await mongoose.connect(
      process.env.MONGO_URL,
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
