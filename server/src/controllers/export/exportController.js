const exportCompanies = async (req, res) => {
  try {
    res.status(200).json({
      message: "Export API Working",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  exportCompanies,
};