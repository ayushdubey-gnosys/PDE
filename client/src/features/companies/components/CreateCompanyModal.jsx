import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../../api/axios';
import { queryClient } from '../../../api/queryClient';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const companySchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  cin: z.string().optional(),
  industry: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.coerce.number().optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  turnover: z.coerce.number().optional().or(z.literal('')),
  source: z.enum(["google_sheet", "mca", "manual"]).default("manual"),
});

const CreateCompanyModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: { source: 'manual' }
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/company', data), // Should it be '/company' or '/company/create'? I'll check the original file. Wait, the original file was api.post('/company/create', data).
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company created successfully');
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to create company');
    },
  });

  const onSubmit = (data) => {
    // Clean up empty strings and nulls
    const payload = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '' && v !== null && v !== undefined && !Number.isNaN(v))
    );
    createMutation.mutate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Company">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Company Name *" {...register('company_name')} error={errors.company_name?.message} />
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="CIN" {...register('cin')} error={errors.cin?.message} />
          <Input label="Industry" {...register('industry')} error={errors.industry?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="City" {...register('city')} error={errors.city?.message} />
          <Input label="State" {...register('state')} error={errors.state?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Phone" type="number" {...register('phone')} error={errors.phone?.message} />
        </div>

        <Input label="Website" {...register('website')} error={errors.website?.message} />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Turnover (₹)" type="number" {...register('turnover')} error={errors.turnover?.message} />
          
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Source</label>
            <select
              {...register('source')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="manual">Manual</option>
              <option value="google_sheet">Google Sheet</option>
              <option value="mca">MCA</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createMutation.isPending}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCompanyModal;
