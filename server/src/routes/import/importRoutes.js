const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  importCSV,
  getImportHistory,
} = require("../../controllers/import/importController");

const router = express.Router();

router.post("/csv", upload.single("file"), importCSV);
router.get("/history", getImportHistory);

module.exports = router;