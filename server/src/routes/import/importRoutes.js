const express = require("express");

const {
  importCSV,
} = require("../../controllers/import/importController");

const router = express.Router();

router.post("/csv", importCSV);

module.exports = router;