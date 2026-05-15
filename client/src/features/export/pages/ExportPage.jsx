import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, FileDown } from 'lucide-react';
import api from '../../../api/axios';
import Button from '../../../components/ui/Button';

const ExportPage = () => {
  const { data: companies, isLoading } = useQuery({
    queryKey: ['exportCompanies'],
    queryFn: () => api.get('/export/companies').then((res) => res.data),
  });

  const exportCount = companies?.companies?.length || companies?.length || 0;

  const handleExport = () => {
    if (!companies || exportCount === 0) return;

    const dataToExport = companies.companies || companies;
    
    // Simple CSV generator
    const headers = ['Name', 'Website', 'Industry', 'City', 'State', 'Employees'];
    const csvContent = [
      headers.join(','),
      ...dataToExport.map(c => [
        `"${c.name || ''}"`,
        `"${c.website || ''}"`,
        `"${c.industry || ''}"`,
        `"${c.city || ''}"`,
        `"${c.state || ''}"`,
        c.employees || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `export_companies_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Export Data</h1>
        <p className="text-sm text-gray-500 mt-1">Download your prospect data as CSV.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-50 rounded-full text-green-500">
            <FileDown className="w-12 h-12" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Export</h2>
        <p className="text-gray-500 mb-8">
          {isLoading ? (
            'Calculating total records...'
          ) : (
            `You have a total of ${exportCount} companies ready for export.`
          )}
        </p>

        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={handleExport}
          disabled={isLoading || exportCount === 0}
        >
          <Download className="w-5 h-5 mr-2" /> 
          Export as CSV
        </Button>
      </div>
    </div>
  );
};

export default ExportPage;