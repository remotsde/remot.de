import React, { useState, useRef } from 'react';
import { Wrench, Save, Printer, Plus, X } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

// تعريف نوع البيانات
interface WorkOrderData {
  workOrderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  serialNumber: string;
  problemDescription: string;
  requiredParts: RequiredPart[];
  totalCost: number;
  status: 'pending' | 'in-progress' | 'completed';
}

interface RequiredPart {
  name: string;
  quantity: number;
  price: number;
}

export const NewWorkOrder: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<WorkOrderData>({
    workOrderNumber: generateWorkOrderNumber(),
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deviceType: '',
    deviceBrand: '',
    deviceModel: '',
    serialNumber: '',
    problemDescription: '',
    requiredParts: [],
    totalCost: 0,
    status: 'pending'
  });

  const [newPart, setNewPart] = useState<RequiredPart>({
    name: '',
    quantity: 1,
    price: 0
  });

  // توليد رقم أمر العمل
  function generateWorkOrderNumber(): string {
    return `WO-${Date.now().toString().slice(-6)}`;
  }

  // معالجة التغييرات في الإدخال
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // إضافة قطعة غيار
  const addPart = () => {
    if (newPart.name && newPart.quantity > 0 && newPart.price > 0) {
      setFormData(prevData => {
        const updatedParts = [
          ...prevData.requiredParts,
          { ...newPart, price: newPart.price * newPart.quantity }
        ];
        const totalCost = updatedParts.reduce((total, part) => total + part.price, 0);
        return {
          ...prevData,
          requiredParts: updatedParts,
          totalCost
        };
      });

      // إعادة تعيين حقول القطعة
      setNewPart({ name: '', quantity: 1, price: 0 });
    }
  };

  // حذف قطعة غيار
  const removePart = (index: number) => {
    setFormData(prevData => {
      const updatedParts = prevData.requiredParts.filter((_, i) => i !== index);
      const totalCost = updatedParts.reduce((total, part) => total + part.price, 0);
      return {
        ...prevData,
        requiredParts: updatedParts,
        totalCost
      };
    });
  };

  // إرسال النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Work Order Data:', formData);
    alert('تم حفظ بيانات أمر العمل بنجاح!');
    // يمكنك إضافة منطق الإرسال إلى الخادم هنا
  };

  // طباعة أمر العمل
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="container mx-auto p-6">
      <div ref={printRef} className="bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          {/* عنوان النموذج */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Wrench className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                استلام عمل صيانة
              </h1>
            </div>
            
            {/* أزرار الإجراءات */}
            <div className="flex space-x-4">
              <button 
                type="button"
                onClick={handlePrint}
                className="btn btn-outline-secondary flex items-center"
              >
                <Printer className="mr-2" /> طباعة
              </button>
              <button 
                type="submit" 
                className="btn btn-primary flex items-center"
              >
                <Save className="mr-2" /> حفظ
              </button>
            </div>
          </div>

          {/* معلومات العميل */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">بيانات العميل</h2>
              <input 
                type="text"
                name="customerName"
                placeholder="اسم العميل"
                value={formData.customerName}
                onChange={handleInputChange}
                className="input"
                required
              />
              <input 
                type="tel"
                name="customerPhone"
                placeholder="رقم الهاتف"
                value={formData.customerPhone}
                onChange={handleInputChange}
                className="input"
                required
              />
              <input 
                type="email"
                name="customerEmail"
                placeholder="البريد الإلكتروني"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            {/* معلومات الجهاز */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">تفاصيل الجهاز</h2>
              <select 
                name="deviceType"
                value={formData.deviceType}
                onChange={handleInputChange}
                className="input"
                required
              >
                <option value="">نوع الجهاز</option>
                <option value="mobile">موبايل</option>
                <option value="laptop">لابتوب</option>
                <option value="desktop">كمبيوتر مكتبي</option>
              </select>
              <input 
                type="text"
                name="deviceBrand"
                placeholder="الماركة"
                value={formData.deviceBrand}
                onChange={handleInputChange}
                className="input"
              />
              <input 
                type="text"
                name="deviceModel"
                placeholder="الموديل"
                value={formData.deviceModel}
                onChange={handleInputChange}
                className="input"
              />
              <input 
                type="text"
                name="serialNumber"
                placeholder="رقم السيريال"
                value={formData.serialNumber}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            {/* وصف المشكلة */}
            <div className="col-span-2 space-y-4">
              <h2 className="text-xl font-semibold">وصف المشكلة</h2>
              <textarea 
                name="problemDescription"
                placeholder="تفا صيل المشكلة"
                value={formData.problemDescription}
                onChange={handleInputChange}
                className="input"
                rows={4}
                required
              />
            </div>
          </div>

          {/* إضافة قطع الغيار */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">إضافة قطع الغيار</h2>
            <div className="flex space-x-4">
              <input 
                type="text"
                placeholder="اسم القطعة"
                value={newPart.name}
                onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                className="input"
                required
              />
              <input 
                type="number"
                placeholder="الكمية"
                value={newPart.quantity}
                onChange={(e) => setNewPart({ ...newPart, quantity: Number(e.target.value) })}
                className="input"
                min={1}
                required
              />
              <input 
                type="number"
                placeholder="السعر"
                value={newPart.price}
                onChange={(e) => setNewPart({ ...newPart, price: Number(e.target.value) })}
                className="input"
                min={0}
                required
              />
              <button 
                type="button"
                onClick={addPart}
                className="btn btn-secondary"
              >
                إضافة
              </button>
            </div>

            {/* قائمة قطع الغيار المضافة */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">قطع الغيار المضافة</h3>
              <ul className="list-disc pl-5">
                {formData.requiredParts.map((part, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{part.name} - {part.quantity} × {part.price / part.quantity} ريال</span>
                    <button 
                      onClick={() => removePart(index)}
                      className="text-red-500"
                    >
                      حذف
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <strong>التكلفة الإجمالية: {formData.totalCost} ريال</strong>
              </div>
            </div>
          </div>

          {/* زر الإرسال */}
          <div className="mt-6">
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              إرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};