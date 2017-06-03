const express = require("express");
const router = express.Router();

const models = require("../model");
const createError = require("../modules/create-error");

router.get("/", (req, res, next) => {
  models.category
    .getAll()
    .then(categories => res.json(categories))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.get("/:id", (req, res, next) => {
  models.category
    .getById(req.params.id)
    .then(category => res.json(category))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

router.post("/", (req, res, next) => {
  models.category
    .add(req.body)
    .then(category => res.status(201).json(category))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

const update = (req, res, next) => {
  models.category
    .update(req.body)
    .then(category => res.json(category))
    .catch(err => next(createError(500, "internal server error", err.message)));
};
router.put("/:id", update);
router.patch("/:id", update);

router.delete("/:id", (req, res, next) => {
  models.category
    .remove(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => next(createError(500, "internal server error", err.message)));
});

module.exports = router;
