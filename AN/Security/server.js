const path = require("path");
const express = require("express");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");

const PORT = 3000;
const app = express();

app.use(helmet());

app.get("/secret", (req, res) => {
    res.send("This is a secret 42");
});

// app.get("/auth/google", (req, res) => {
//     res.send("Google login");
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),
}, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})