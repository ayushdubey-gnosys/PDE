import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import { queryClient } from '../../../api/queryClient';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';

const ImportPage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['importHistory'],
    queryFn: () => api.get('/import/history').then((res) => res.data),
  });

  const uploadMutation = useMutation({
    mutationFn: (formData) => api.post('/import/csv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: (res) => {
      toast.success(res.data?.message || 'CSV imported successfully');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      queryClient.invalidateQueries({ queryKey: ['importHistory'] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to import CSV');
    },
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'text/csv') {
      setFile(selected);
    } else {
      toast.error('Please select a valid CSV file');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    uploadMutation.mutate(formData);
  };

  const columns = [
    { header: 'Date', accessor: 'createdAt', cell: (row) => new Date(row.createdAt).toLocaleString() },
    { header: 'File Name', accessor: 'file_name' },
    { header: 'Status', cell: (row) => (
      <span className="flex items-center">
        {row.status === 'completed' ? (
          <><CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Success</>
        ) : (
          <><AlertCircle className="w-4 h-4 text-red-500 mr-1" /> Failed</>
        )}
      </span>
    )},
    { header: 'Records Added', accessor: 'imported_records' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Import Data</h1>
        <p className="text-sm text-gray-500 mt-1">Upload CSV files to import prospect companies.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-blue-50 rounded-full text-blue-500">
              <Upload className="w-8 h-8" />
            </div>
            {file ? (
              <div className="flex items-center space-x-2 text-gray-700">
                <FileText className="w-5 h-5" />
                <span className="font-medium">{file.name}</span>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">CSV files only (max. 10MB)</p>
              </div>
            )}
            <Button
              variant={file ? "primary" : "outline"}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? 'Change File' : 'Select File'}
            </Button>
          </div>
        </div>

        {file && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleUpload}
              isLoading={uploadMutation.isPending}
            >
              Start Import
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Import History</h2>
        </div>
        <Table
          columns={columns}
          data={history?.history || []}
          isLoading={isHistoryLoading}
          emptyMessage="No import history found."
        />
      </div>
    </div>
  );
};

export default ImportPage;