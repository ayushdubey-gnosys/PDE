import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Building2, Globe, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import CreateCompanyModal from '../components/CreateCompanyModal';

const fetchCompanies = async (searchParams) => {
  const query = new URLSearchParams();
  if (searchParams.city) query.append('city', searchParams.city);
  if (searchParams.industry) query.append('industry', searchParams.industry);
  if (searchParams.state) query.append('state', searchParams.state);
  
  const url = query.toString() ? `/company?${query.toString()}` : '/company';
  const response = await api.get(url);
  return response.data.companies || response.data;
};

const CompaniesPage = () => {
  const navigate = useNavigate();
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

      {isLoading ? (
        <div className="flex justify-center py-12">
          <p className="text-gray-500">Loading companies...</p>
        </div>
      ) : companies?.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          No companies found. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companies?.map((company) => (
            <div 
              key={company._id}
              onClick={() => navigate(`/companies/${company._id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col h-full group relative"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {company.company_name}
                </h3>
              </div>
              
              <div className="space-y-3 mt-auto flex-grow flex flex-col justify-end">
                <div className="flex items-start text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span className="truncate">{company.industry || 'N/A'}</span>
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span className="truncate">
                    {[company.city, company.state].filter(Boolean).join(', ') || 'N/A'}
                  </span>
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <Globe className="w-4 h-4 mr-2 text-gray-400 shrink-0 mt-0.5" />
                  <span className="truncate">
                    {company.website ? company.website : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateCompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CompaniesPage;