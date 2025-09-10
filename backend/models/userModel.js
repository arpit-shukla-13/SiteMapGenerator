const { model, Schema } = require('../connection');

const mySchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, unique: true },
    password: String, // password is required and must be unique
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('user', mySchema);