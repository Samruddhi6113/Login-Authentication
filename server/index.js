// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require("cors");
// const connection = require("./db");
// const userRoutes = require('./routes/users');
// const authRoutes = require('./routes/auth');
// //database connection
// connection()
// //middlewares
// app.use(express.json())
// app.use(cors());
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.get('/', (req, res) => {
//     res.send('Welcome to the Auth in MERN backend!');
//   });  
// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listening on port ${port}.....`))

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Database connection
connection();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Auth in MERN backend!');
});

// Listen on port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}.....`));


