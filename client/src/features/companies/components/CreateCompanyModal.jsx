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
  name: z.string().min(2, 'Name is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  industry: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  employees: z.coerce.number().optional(),
});

const CreateCompanyModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(companySchema),
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/company/create', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast.success('Company created successfully');
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to create company');
    },
  });

  const onSubmit = (data) => {
    // Clean up empty strings
    const payload = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    createMutation.mutate(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Company">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Company Name *" {...register('name')} error={errors.name?.message} />
        <Input label="Website" {...register('website')} error={errors.website?.message} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Industry" {...register('industry')} error={errors.industry?.message} />
          <Input label="Employees" type="number" {...register('employees')} error={errors.employees?.message} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="City" {...register('city')} error={errors.city?.message} />
          <Input label="State" {...register('state')} error={errors.state?.message} />
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
