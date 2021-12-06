const { Schema, model } = require('mongoose');

const schema = new Schema({
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true, maxlength: [1000, 'Comment must be below 1000 characters long.'] },
}, { timestamps: true }
)

module.exports = model('Comment', schema);