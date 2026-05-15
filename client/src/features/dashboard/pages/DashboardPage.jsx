import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../api/axios';
import { Building2, Tags, Users, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-full ${colorClass}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

const DashboardPage = () => {
  // We can fetch some mock or real stats here if an API exists
  // For now, let's use the company count as an example if it's returned by the list
  const { data: companiesData } = useQuery({
    queryKey: ['companies'],
    queryFn: () => api.get('/company').then((res) => res.data),
  });

  const companyCount = companiesData?.companies?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your prospect data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Companies"
          value={companyCount}
          icon={Building2}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Active Tags"
          value="12"
          icon={Tags}
          colorClass="bg-green-100 text-green-600"
        />
        <StatCard
          title="Total Users"
          value="5"
          icon={Users}
          colorClass="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Recent Activities"
          value="24"
          icon={Activity}
          colorClass="bg-yellow-100 text-yellow-600"
        />
      </div>

      {/* Add more dashboard sections below as needed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Companies Added</h2>
        <div className="text-sm text-gray-500">
          Navigate to the companies section to view details.
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
