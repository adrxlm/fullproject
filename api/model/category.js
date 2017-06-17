const mongo = require("../modules/mongo");
const uuid = require("uuid");

const removeMongoID = obj => Object.assign(obj, { _id: undefined });

exports.getAll = () => mongo.collection("categories")
  .then(col => col.find({}).toArray())
  .then(list => list.map(item => removeMongoID(item)));

exports.getById = id => mongo.collection("categories")
  .then(col => col.findOne({ id }, { fields: { _id: -1 } }))

exports.add = category => mongo.collection("categories")
  .then(col => {
    category.id = uuid.v4();
    return Promise.all([
      col.insert(category, { forceServerObjectId: true }),
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
  .then(r => r.value && removeMongoID(r.value));
