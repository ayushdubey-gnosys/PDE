import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import api from '../../../api/axios';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import CreateCompanyModal from '../components/CreateCompanyModal';

const fetchCompanies = async (searchParams) => {
  const query = new URLSearchParams();
  if (searchParams.city) query.append('city', searchParams.city);
  if (searchParams.industry) query.append('industry', searchParams.industry);
  if (searchParams.state) query.append('state', searchParams.state);
  
  const url = query.toString() ? `/company/search?${query.toString()}` : '/company';
  const response = await api.get(url);
  return response.data.companies || response.data;
};

const CompaniesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ city: '', industry: '', state: '' });
  const [activeFilters, setActiveFilters] = useState({ city: '', industry: '', state: '' });

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', activeFilters],
    queryFn: () => fetchCompanies(activeFilters),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveFilters(filters);
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { 
      header: 'Website', 
      cell: (row) => row.website ? (
        <a href={row.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
          {row.website}
        </a>
      ) : '-'
    },
    { header: 'Industry', accessor: 'industry', cell: (row) => row.industry || '-' },
    { header: 'City', accessor: 'city', cell: (row) => row.city || '-' },
    { header: 'State', accessor: 'state', cell: (row) => row.state || '-' },
    { header: 'Employees', accessor: 'employees', cell: (row) => row.employees || '-' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your company prospects.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Add Company
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end">
          <div className="w-full sm:w-auto flex-1 min-w-[200px]">
            <Input 
              placeholder="Filter by Industry..." 
              value={filters.industry}
              onChange={(e) => setFilters({...filters, industry: e.target.value})}
            />
          </div>
          <div className="w-full sm:w-auto flex-1 min-w-[200px]">
            <Input 
              placeholder="Filter by City..." 
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
            />
          </div>
          <div className="w-full sm:w-auto flex-1 min-w-[200px]">
            <Input 
              placeholder="Filter by State..." 
              value={filters.state}
              onChange={(e) => setFilters({...filters, state: e.target.value})}
            />
          </div>
          <Button type="submit" variant="secondary" className="w-full sm:w-auto">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          columns={columns}
          data={companies}
          isLoading={isLoading}
          emptyMessage="No companies found."
        />
      </div>

      <CreateCompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CompaniesPage;