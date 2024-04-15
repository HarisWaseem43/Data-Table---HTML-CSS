const mongoose = require("mongoose");

// MongoDB connection string
const uri = "mongodb://localhost:27017";

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DataBase");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongoDB();
