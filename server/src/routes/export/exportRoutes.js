const express = require("express");

const {
  exportCompanies,
} = require("../../controllers/export/exportController");

const router = express.Router();

router.get("/companies", exportCompanies);

module.exports = router;