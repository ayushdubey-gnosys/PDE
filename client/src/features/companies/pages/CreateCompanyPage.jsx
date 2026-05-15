import { useState } from "react";

import { useCreateCompany } from "../hooks/useCreateCompany";

const CreateCompanyPage = () => {
  const { mutate, isPending } =
    useCreateCompany();

  const [formData, setFormData] =
    useState({
      company_name: "",
      cin: "",
      industry: "",
      city: "",
      state: "",
      email: "",
      phone: "",
      website: "",
      turnover: "",
      source: "manual",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      ...formData,
      turnover: Number(
        formData.turnover
      ),
      phone: Number(formData.phone),
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Create New Company
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Company Name */}
        <div>
          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter company name"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* CIN */}
        <div>
          <label className="block mb-2 font-medium">
            CIN Number
          </label>

          <input
            type="text"
            name="cin"
            value={formData.cin}
            onChange={handleChange}
            placeholder="Enter CIN"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block mb-2 font-medium">
            Industry
          </label>

          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Enter industry"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-2 font-medium">
            City
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* State */}
        <div>
          <label className="block mb-2 font-medium">
            State
          </label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block mb-2 font-medium">
            Website
          </label>

          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Turnover */}
        <div>
          <label className="block mb-2 font-medium">
            Turnover
          </label>

          <input
            type="number"
            name="turnover"
            value={formData.turnover}
            onChange={handleChange}
            placeholder="Enter turnover"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Source */}
        <div>
          <label className="block mb-2 font-medium">
            Source
          </label>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="manual">
              Manual
            </option>

            <option value="google_sheet">
              Google Sheet
            </option>

            <option value="mca">
              MCA
            </option>
          </select>
        </div>

        {/* Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {isPending
              ? "Creating..."
              : "Create Company"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompanyPage;