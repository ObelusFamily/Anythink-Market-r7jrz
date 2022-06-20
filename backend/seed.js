require("dotenv").config();

require("./models/User");
require("./models/Item");
require("./models/Comment");

const mongoose = require("mongoose");
const Item = mongoose.model("Item");
const User = mongoose.model("User");
const Comment = mongoose.model("Comment");

const NUMBER = 100;


// DB Connection
async function mongoDBConnect() {
    if(!process.env.MONGODB_URI) {
        console.error("MONGODB_URI env not found");
        throw "Missing ENV: MONGODB_URI"
    }
    mongoose.connect(process.env.MONGODB_URI);
}

// UTIL
function uuid() {
    TimeStr = Date.now().toString(36).slice(-2);
    RandStr = Math.random().toString(26).slice(-8)
    return TimeStr + RandStr;
}

// ===
// SEED FUNCTIONS
async function seedUser(UUID) {
    let user = new User({
        username: UUID,
        email: `${UUID}@test.wilco.gg`,
    });
    user.setPassword(UUID);
    try {
        await user.save();
        return user._id;
      } catch (err) {
        throw `${UUID} - Error seeding user`
      }
}

async function seedItem(userID, UUID) {
    let item = new Item({
        slug: `slug${UUID}`,
        title: `itemTitle${UUID}`,
        description: UUID,
        seller: userID
    });
    try {
        await item.save();
        return item._id;
      } catch (err) {
        throw `${UUID} - Error seeding item`
      }
}

async function seedComments(userId, itemId, UUID) {
    let comment = new Comment({
        body: UUID,
        seller: userId,
        item: itemId
    })
    try {
        await comment.save();
        return comment._id;
      } catch (err) {
        throw `${UUID} - Error seeding comment`
      }
}

// MAIN
async function seedDB() {
    mongoDBConnect();
    for (let i = 0; i < NUMBER; i++) {
        try {
            UUID = uuid();
            console.log(`${i}: ${UUID} - Init`);
            userRef = await seedUser(UUID);
            console.log(`${i}: ${UUID} - User Created (${userRef})`);
            itemRef = await seedItem(userRef, UUID);
            console.log(`${i}: ${UUID} - Item Created (${itemRef})`);
            commentRef = await seedComments(userRef, itemRef, UUID);
            console.log(`${i}: ${UUID} - Comment Created (${commentRef})`);
        } catch(err) {
            console.error(err);
        }
    }
}

seedDB()
.then(() => {
    process.exit(0);
})
.catch((err) => {
    console.error(err);
    process.exit(1)
})