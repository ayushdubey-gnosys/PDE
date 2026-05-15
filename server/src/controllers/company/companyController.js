const Company = require("../../models/company.model");

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const filters = {};

    if (req.query.city) {
      filters.city = { $regex: req.query.city, $options: "i" };
    }

    if (req.query.state) {
      filters.state = { $regex: req.query.state, $options: "i" };
    }

    if (req.query.industry) {
      filters.industry = { $regex: req.query.industry, $options: "i" };
    }

    const companies = await Company.find(filters).populate("tags");

    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    res.json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(company);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);

    res.json({
      message: "Company deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};