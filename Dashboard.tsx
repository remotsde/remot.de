import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FileText,
  Package,
  Users,
  Monitor,
  BarChart3,
  Settings,
  Bell,
  Wrench,
} from 'lucide-react';

export function Dashboard() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: Wrench,
      title: t('dashboard.newWorkOrder'),
      path: '/service/new',
      color: 'bg-teal-500',
    },
    {
      icon: Wrench,
      title: t('dashboard.workOrders'),
      path: '/service',
      color: 'bg-cyan-500',
    },
    {
      icon: FileText,
      title: t('dashboard.newInvoice'),
      path: '/new-invoice',
      color: 'bg-blue-500',
    },
    {
      icon: FileText,
      title: t('dashboard.viewInvoices'),
      path: '/invoices',
      color: 'bg-green-500',
    },
    {
      icon: Package,
      title: t('dashboard.partsManagement'),
      path: '/parts',
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      title: t('dashboard.customerManagement'),
      path: '/customers',
      color: 'bg-yellow-500',
    },
    {
      icon: Monitor,
      title: t('dashboard.deviceTypes'),
      path: '/devices',
      color: 'bg-pink-500',
    },
    {
      icon: BarChart3,
      title: t('dashboard.reports'),
      path: '/reports',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Link
          key={index}
          to={card.path}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className={`p-4 ${card.color}`}>
            <card.icon className="w-8 h-8 text-white" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}