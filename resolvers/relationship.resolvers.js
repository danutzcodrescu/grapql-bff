import Relationship from '../models/Relationship.Model';

export default {
  Query: {
    relationships: () => Relationship.find({})
  },
  Mutation: {
    createRelationship: (parent, { id1, id2 }) =>
      Relationship.create({ id1, id2 })
  }
};
