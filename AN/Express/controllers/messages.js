const path = require("path");

const getMessages = (req, res) => {
    res.render("messages", {
        title: "Messages to my friends",
        name: "John Doe",
    });
    // res.sendFile(path.join(__dirname, "..", "public/images", "skimountain.jpg"));
    // res.send(`
    // <html>
    //     <body>
    //         <ul>
    //             <li>Hello John Doe</li>
    //             <li>What are your thoughts on astronomy?</li>
    //         </ul>
    //     </body>
    // </html>`);
};

const postMessage = (req, res) => {
    console.log("Updating messages...");
};

module.exports = {
    getMessages,
    postMessage,
};