import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Prospect Data Engine
          </h1>
          <p className="text-gray-500 mt-1">
            Manage companies, tags, imports, and exports
          </p>
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-gray-500 text-sm">Total Companies</h2>
          <p className="text-3xl font-bold mt-2">1,250</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-gray-500 text-sm">Active Tags</h2>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-gray-500 text-sm">Imports</h2>
          <p className="text-3xl font-bold mt-2">320</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="text-gray-500 text-sm">Exports</h2>
          <p className="text-3xl font-bold mt-2">145</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-white shadow rounded-2xl p-6 text-left hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Import Data</h3>
          <p className="text-gray-500">
            Upload CSV or Google Sheets data
          </p>
        </button>

        <button className="bg-white shadow rounded-2xl p-6 text-left hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Manage Companies</h3>
          <p className="text-gray-500">
            View and filter company database
          </p>
        </button>

        <button className="bg-white shadow rounded-2xl p-6 text-left hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Export Data</h3>
          <p className="text-gray-500">
            Download structured datasets
          </p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="font-medium">
              New company imported successfully
            </p>
            <span className="text-sm text-gray-500">
              2 minutes ago
            </span>
          </div>

          <div className="border-b pb-3">
            <p className="font-medium">
              Tag "High Priority" added
            </p>
            <span className="text-sm text-gray-500">
              10 minutes ago
            </span>
          </div>

          <div>
            <p className="font-medium">
              Export completed for 250 companies
            </p>
            <span className="text-sm text-gray-500">
              1 hour ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
