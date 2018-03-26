import User from '../models/Users.Model';
import Relationship from '../models/Relationship.Model';

export default {
  Query: {
    users: () => User.find({}),
    user: (parent, { id }) => User.findById(id)
  },

  User: {
    relationships: root =>
      Relationship.find({ $or: [{ id1: root._id }, { id2: root._id }] })
  },

  Mutation: {
    createUser: (parent, args) => User.create(args),
    login: async (parent, { username, password }) => {
      let user = await User.findOne({ username, password });
      if (user) {
        user = await User.findByIdAndUpdate(
          user.toObject()._id,
          {
            status: 'active'
          },
          { new: true }
        );
        return {
          success: true,
          user
        };
      } else {
        return {
          success: false,
          errors: [
            {
              code: 404,
              message: 'User not found'
            }
          ]
        };
      }
    },
    logout: async (parent, { id }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { status: 'offline' },
          { new: true }
        );
        return {
          success: true,
          user
        };
      } catch (e) {
        return {
          success: false,
          errors: [
            {
              code: 500,
              message: e
            }
          ]
        };
      }
    },
    changeStatus: async (parent, { id, status }) => {
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        return {
          success: true,
          user
        };
      } catch (e) {
        return {
          success: false,
          errors: [
            {
              code: 500,
              message: e
            }
          ]
        };
      }
    }
  }
};
