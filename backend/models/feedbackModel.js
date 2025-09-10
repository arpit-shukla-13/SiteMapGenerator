const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    rating: Number,
    feedback: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('feedback', mySchema);