var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../connections/users.connection");
const RelationshipSchema = new Schema(
  {
    id1: String,
    id2: String,
    status: String
  },
  { timestamps: true }
);
const Relationship = connection.model("Relationship", RelationshipSchema);

export default Relationship;
