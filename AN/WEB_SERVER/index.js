const http = require("http");

const friends = [
    { id: 0, name: "Albert Einstein" },
    { id: 1, name: "Isaac Newton" },
    { id: 2, name: "Marie Curie" },
];

const server = http.createServer((req, res) => {
    const items = req.url.split("/");
    if (req.method === "POST" && items[1] === "friends") {
        req.on("data", (data) => {
            const friend = data.toString();
            console.log('Received friend:', friend);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    } else if (req.method === "GET" && items[1] === "friends") {
        res.writeHead(200, { "Content-Type": "application/json" });
        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === "GET" && items[1] === "messages") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
    <html>
    <body>
    <ul>
    <li>Hello John Doe</li>
    <li>What are your thoughts on astronomy?</li>
    </ul>
    </body>
    </html>
    `)

    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
