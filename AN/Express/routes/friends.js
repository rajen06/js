const express = require("express");
const { getFriends, getFriendById, postFriend } = require("../controllers/friends");

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
    console.log("ip address:", req.ip);
    next();
});
friendsRouter.post("/", postFriend);
friendsRouter.get("/", getFriends);
friendsRouter.get("/:id", getFriendById);

module.exports = friendsRouter;