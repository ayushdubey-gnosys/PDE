import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Globe, MapPin, Mail, Phone, IndianRupee, Hash } from 'lucide-react';
import { useCompany } from "../hooks/useCompany";
import Button from '../../../components/ui/Button';

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: company, isLoading, error } = useCompany(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading company details...</p>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-500">Failed to load company details.</p>
        <Button onClick={() => navigate('/companies')} variant="outline">
          Back to Companies
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Button onClick={() => navigate('/companies')} variant="ghost" className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Company Details</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{company.company_name}</h2>
              {company.industry && (
                <div className="flex items-center mt-2 text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span className="font-medium">{company.industry}</span>
                </div>
              )}
            </div>
            {company.source && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                Source: {company.source.replace('_', ' ')}
              </span>
            )}
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    {company.website ? (
                      <a href={company.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                        {company.website}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-medium">-</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{company.email || '-'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">{company.phone || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Company Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">
                      {[company.city, company.state].filter(Boolean).join(', ') || '-'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Hash className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">CIN</p>
                    <p className="text-gray-900 font-medium break-all">{company.cin || '-'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <IndianRupee className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Turnover</p>
                    <p className="text-gray-900 font-medium">
                      {company.turnover ? `₹ ${company.turnover.toLocaleString()}` : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;