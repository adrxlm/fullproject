const express = require("express");
const app = express();
const routesCategories = require("./routes/categories");
const routesBooks = require("./routes/books");
const bodyParser = require("body-parser");
const errorHandler = require("./modules/error-handler");
const mongo = require("./modules/mongo");
const logBody = require("./modules/log-body");
const cors = require('cors');


app.use(cors());

app.use(bodyParser.json());

app.use(logBody);

app.use("/categories", routesCategories);
app.use("/books", routesBooks);

app.use(errorHandler);

mongo
  .init()
  .then(() =>
    app.listen(3500, () => console.log("Example app listening on port 3500!"))
  );
