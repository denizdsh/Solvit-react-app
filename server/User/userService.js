const User = require('./UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

function generateJwt(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        username: user.username,
    }, SECRET)

    return token;
}

async function register(email, username, password, imageUrl) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        const err = new Error(`Account with email (${email}) already exists in database.`);
        err.status = 409;
        throw err;
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        const err = new Error(`Account with username (${username}) already exists in database.`);
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email,
        username,
        hashedPassword,
        imageUrl
    })

    await user.save();

    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
        accessToken: generateJwt(user)
    }
}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }
    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        const err = new Error('Incorrect email or password');
        err.status = 401;
        throw err;
    }

    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
        accessToken: generateJwt(user)
    }
}
async function getCardTopicUserData(userId) {
    const user = await User.findById(userId);
    return user ? { username: user.username, savedTopics: user.savedTopcis || [] } : {};
}

async function getImageByUsername(username) {
    const user = await User.findOne({ username });
    return user ? user.imageUrl : '';
}

async function getFollowingCategories(userId) {
    const user = await User.findById(userId);
    return user ? user.followingCategories || [] : [];
}

async function followCategory(userId, category) {
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error('You have to be logged in to perform this action.')
        err.status = 400;
        throw err;
    }

    if (user.followingCategories.includes(category)) {
        const err = new Error(`You have already followed category ${category}.`)
        err.status = 400;
        throw err;
    }

    user.followingCategories.push(category);
    await user.save();
}

async function unfollowCategory(userId, category) {
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error('You have to be logged in to perform this action.')
        err.status = 400;
        throw err;
    }

    if (!user.followingCategories.includes(category)) {
        const err = new Error(`You haven't followed category ${category} yet.`)
        err.status = 400;
        throw err;
    }

    user.followingCategories.splice(user.followingCategories.indexOf(category), 1);
    await user.save();
}

module.exports = {
    register,
    login,
    getCardTopicUserData,
    getImageByUsername,
    getFollowingCategories,
    followCategory,
    unfollowCategory
};