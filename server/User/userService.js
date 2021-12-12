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

async function getImageByUsername(username) {
    const user = await User.findOne({ username });
    return user ? user.imageUrl : '';
}
module.exports = {
    register,
    login,
    getImageByUsername
};