import User from "../models/Users.Model";
import Relationship from "../models/Relationship.Model";

export default {
	Query: {
		users: () => User.find({}),
		user: (parent, { id }, { models }) => User.findById(id),
	},

	User: {
		relationships: (user) => Relationship.find({ $or: [{ id1: user.id }, { id2: user.id }] })
	},

	Mutation: {
		createUser: (parent, args, { models }) => User.create(args),
	}
};
