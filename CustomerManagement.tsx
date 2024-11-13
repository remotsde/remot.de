import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users } from 'lucide-react';

export function CustomerManagement() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6" />
        <h1 className="text-2xl font-bold">{t('dashboard.customerManagement')}</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>Customer management will be implemented here</p>
      </div>
    </div>
  );
}