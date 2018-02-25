var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../connections/users.connection');
const UserSchema = new Schema({
	username: String,
	email: String,
	password: { type: String, default: 'test' }
}, { timestamps: true })
const User = connection.model('User', UserSchema);

export default User;
