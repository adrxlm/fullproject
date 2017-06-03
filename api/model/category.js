const mongo = require("../modules/mongo");
const uuid = require("uuid");

exports.getAll = () => {
  return mongo.collection("categories").then(col => {
    return col.find().toArray();
  });
};

exports.getById = id => {
  return mongo.collection("categories").then(col => {
    return col.findOne({ id });
  });
};

exports.add = category => {
  return mongo.collection("categories").then(col => {
    category.id = uuid.v4();
    return col.insert(category);
  });
};

exports.update = category => {
  return mongo.collection("categories").then(col => {
    return col.findOneAndUpdate({ id: category.id }, category);
  });
};

exports.remove = id => {
  return mongo.collection("categories").then(col => {
    return col.remove({ id });
  });
};
