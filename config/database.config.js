const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://akhtarnasim1990:S1BjGLRY6wQqcqs3@cluster0.cwftjul.mongodb.net/test";

module.exports.dataBaseConnection = async (app) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to Database");
    // app.listen(process.env.PORT);
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
