const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "client"],
    required: true,
  },
});

// Desactiva el buffering para este modelo
userSchema.set("bufferCommands", false);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
