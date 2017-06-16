const mongo = require("../modules/mongo");
const uuid = require("uuid");

exports.getAll = () => mongo.collection("categories")
  .then(col => col.find().toArray())
  .then(list => list.map(item => Object.assign(item, { _id: undefined })));

exports.getById = id => mongo.collection("categories")
  .then(col => col.findOne({ id }))
  .then(category => category && Object.assign(category, { _id: undefined }));

exports.add = category => mongo.collection("categories")
  .then(col => {
    category.id = uuid.v4();
    return Promise.all([
      col.insert(category),
      category
    ]);
  })
  .then(([result, category]) => category);

exports.update = category => mongo.collection("categories")
  .then(col => Promise.all([
    col.findOneAndUpdate({ id: category.id }, category),
    category
  ]))
  .then(([r, category]) => r.value && category);

exports.remove = id => mongo.collection("categories")
  .then(col => col.findOneAndDelete({ id }))
  .then(r => r.value && Object.assign(r.value, { _id: undefined }));
