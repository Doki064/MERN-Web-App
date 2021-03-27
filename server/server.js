require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}...`));

require("./database");

app.get("/", ((req, res) => {
    res.send("<h1>Server is running</h1>");
}))

// API
const users = require("./routes/users");
app.use("/api/users", users);
