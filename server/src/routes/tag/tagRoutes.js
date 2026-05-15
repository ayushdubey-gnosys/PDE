const express = require("express");

const {
  createTag,
  getTags,
  deleteTag,
} = require("../../controllers/tag/tagController");

const router = express.Router();

router.post("/", createTag);

router.get("/", getTags);

router.delete("/:id", deleteTag);

module.exports = router;