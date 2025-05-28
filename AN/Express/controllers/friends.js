const friends = require("../models/friends");

const getFriends = (req, res) => {
    res.json(friends);
};

const getFriendById = (req, res) => {
    const friendId = Number(req.params.id);
    const friend = friends[friendId];
    if (friend) {
        res.json(friend);
    } else {
        res.status(404).json({ error: "Friend not found" });
    }
};

const postFriend = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ error: "Missing friend name" });
    }
    const newFriend = { id: friends.length, name: req.body.name };
    friends.push(newFriend);
    res.json(newFriend);
};

module.exports = {
    getFriends,
    getFriendById,
    postFriend,
};