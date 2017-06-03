const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");

router.get("/", (req, res, next) => {
  models.book
    .getAll()
    .then(books => res.json(books))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.get("/category/:id", (req, res, next) => {
  models.book
    .getByCategoryId(req.params.id)
    .then(book => res.json(book))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.get("/:id", (req, res, next) => {
  models.book
    .getById(req.params.id)
    .then(book => res.json(book))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.post("/", (req, res, next) => {
  models.book
    .add(req.body)
    .then(book => res.status(201).json(book))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

const update = (req, res, next) => {
  models.book
    .update(req.body)
    .then(book => res.json(book))
    .catch(err => next(createError(500, "internal server error", err.message)));
};
router.put("/:id", update);
router.patch("/:id", update);

router.delete("/:id", (req, res, next) => {
  models.book
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

module.exports = router;
