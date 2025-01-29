const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose
  .connect("mongodb://admin:123@localhost:27017/tuki_db?authSource=admin", {
    dbName: "tuki_db",
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
  })
  .then(() => {
    console.log("Conexión exitosa a MongoDB desde Node.js");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB desde Node.js:", err.message);
  });
