const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    url: { type: String, required: true },
    file: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('sitemapdata', mySchema);