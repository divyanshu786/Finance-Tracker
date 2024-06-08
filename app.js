const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const router = require("./src/routes/api_v1");

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/v1", router);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/financial_tracker', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

