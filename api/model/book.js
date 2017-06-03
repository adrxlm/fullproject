const mongo = require("../modules/mongo");
const uuid = require("uuid");

const getAll = () => {
  return mongo.collection("books").then(col => {
    return col.find().toArray();
  });
};

exports.getAll = getAll;

exports.getById = id => {
  return mongo.collection("books").then(col => {
    return col.findOne({ id });
  });
};

exports.getByCategoryId = id =>
  getAll().then(books => books.filter(book => book.categories.includes(id)));

exports.add = book => {
  return mongo.collection("books").then(col => {
    book.id = uuid.v4();
    return col.insert(book);
  });
};

exports.update = book => {
  return mongo.collection("books").then(col => {
    return col.findOneAndUpdate({ id: book.id }, book);
  });
};

exports.remove = id => {
  return mongo.collection("books").then(col => {
    return col.remove({ id });
  });
};
