const express = require("express");

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {
        // event loop is blocked...
    }
}

app.get("/", (req, res) => {
    res.send(`Performance example ${process.pid}`);
});

app.get('/time', (req, res) => {
    // delay the response
    delay(4000);
    res.send(`Beep beep beep ${process.pid}`);
});

console.log("running server.js");

console.log(`Worker ${process.pid} started`);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

