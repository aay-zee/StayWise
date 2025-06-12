const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017/test";

//Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

//Root
app.get("/", (req, res) => {
  res.send("Hello World! Root Here");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
