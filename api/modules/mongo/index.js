const mongodb = require("mongodb"), client = mongodb.MongoClient;

const uuid = require("uuid");

const path = require("path");

const readJSON = require("read-json");

const booksFile = path.resolve(__dirname, "../../data/books.json");
const categoriesFile = path.resolve(__dirname, "../../data/categories.json");

const connectionString = `mongodb://fullproject_mongodb_1:27017/mongo-db`;

let promise;

let db;

const dbConnector = connectionString => {
  if (promise) {
    return promise;
  }
  console.log(`Mongo connect: ${connectionString}`);
  promise = client.connect(connectionString).then(function(database) {
    db = database;
    return db;
  });

  return promise;
};

const collection = name => {
  return dbConnector(connectionString).then(db => db.collection(name));
};

const fetch = filename => {
  return new Promise((resolve, reject) =>
    readJSON(filename, (error, elements) => {
      if (error) {
        return reject(error);
      }

      resolve(elements);
    })
  );
};

const init = (type, file) => {
  let col = {};
  return collection(type)
    .then(coll => {
      col = coll;
      return col.find().toArray();
    })
    .then(elementsDB => {
      if (!elementsDB.length) {
        console.log(`MongoDB collection (${type}) not found, import...`);
        return fetch(file).then(elements => {
          elements = elements.map(el => {
            el.id = uuid.v4();
            return el;
          });
          return col.insertMany(elements);
        });
      }
      console.log(`MongoDB collection (${type}) found...`);
      return Promise.resolve();
    });
};

const initBooks = () => init("books", booksFile);

const initCategories = () => init("categories", categoriesFile);

exports.dbConnector = dbConnector;

exports.collection = collection;

exports.init = () => {
  console.log("MongoDB init...");
  return Promise.all([initBooks(), initCategories()]);
};
