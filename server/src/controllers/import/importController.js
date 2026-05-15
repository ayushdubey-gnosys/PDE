const importModel = require("../../models/import.model");
const Company = require("../../models/company.model");
const csv = require("csv-parser");
const { Readable } = require("stream");

const importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const results = [];
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    bufferStream
      .pipe(csv())
      .on("data", (data) => {
        // Normalize keys (lowercase, replace spaces/underscores with empty or map them)
        const normalizedData = {};
        for (const key in data) {
          const cleanKey = key.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
          normalizedData[cleanKey] = data[key];
        }

        const company = {
          company_name: normalizedData.companyname || normalizedData.name || data["Company Name"] || data["name"] || data["company_name"],
          cin: normalizedData.cin || data["CIN"],
          industry: normalizedData.industry || data["Industry"],
          city: normalizedData.city || data["City"],
          state: normalizedData.state || data["State"],
          email: normalizedData.email || data["Email"],
          phone: normalizedData.phone || data["Phone"],
          website: normalizedData.website || data["Website"],
          turnover: normalizedData.turnover ? Number(normalizedData.turnover.toString().replace(/[^0-9.]/g, '')) : undefined,
          source: "manual", // Default source for now or from frontend
        };

        if (company.company_name) {
          results.push(company);
        }
      })
      .on("end", async () => {
        let imported_records = 0;
        let duplicates_skipped = 0;

        for (const company of results) {
          try {
            // Check for duplicates based on email or cin if they exist, else just insert (or handle unique errors)
            // But relying on unique constraints of the model is easiest
            await Company.create(company);
            imported_records++;
          } catch (error) {
            // Error code 11000 is MongoDB duplicate key error
            if (error.code === 11000) {
              duplicates_skipped++;
            } else {
              console.error("Error inserting company:", error);
            }
          }
        }

        const newImport = await importModel.create({
          source_type: "csv",
          file_name: req.file.originalname,
          total_records: results.length,
          imported_records,
          duplicates_skipped,
        });

        res.status(201).json({
          success: true,
          message: "CSV Imported Successfully",
          data: newImport,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getImportHistory = async (req, res) => {
  try {
    const history = await importModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      history: history, // Adjusted to match frontend: data?.history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  importCSV,
  getImportHistory,
};