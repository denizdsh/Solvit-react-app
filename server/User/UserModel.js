const { Schema, model } = require('mongoose');

const { categories } = require('../config');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    imageUrl: { type: String, match: /^https?:\/\// },
    followingCategories: [{ type: String, enum: categories }],
    savedTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
});

module.exports = model('User', schema);