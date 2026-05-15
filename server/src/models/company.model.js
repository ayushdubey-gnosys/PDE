const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },

    cin: {
      type: String,
      unique: true,
      sparse: true,
    },

    industry: String,

    city: String,

    state: String,

    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    phone: {
      type: Number,
      unique: true,
      sparse: true,
    },

    website: String,

    turnover: Number,

    source: {
      type: String,
      enum: ["google_sheet", "mca", "manual"],
      default: "manual",
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

companySchema.index({ city: 1 });

companySchema.index({ industry: 1 });

module.exports = mongoose.model("Company", companySchema);