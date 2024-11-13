import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

export function NewInvoice() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6" />
        <h1 className="text-2xl font-bold">{t('dashboard.newInvoice')}</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p>New Invoice form will be implemented here</p>
      </div>
    </div>
  );
}