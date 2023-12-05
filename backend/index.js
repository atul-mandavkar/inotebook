const connectToMongo = require('./db');
const express = require("express");

connectToMongo();

const app = express();
const port = 5000; // changed the port number because react app will run on port 3000 by default

app.get("/", (req, res) => {
  res.send("Hello Antya");
});

// Middleware to read from body
app.use(express.json());

// Availabe routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

