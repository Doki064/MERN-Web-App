const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/", ((req, res) => {
    res.send("<h1>Server is running</h1>");
}))

app.post("/api/users", async (req, res) => {
    try {
        console.log(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).send();
    }
})


