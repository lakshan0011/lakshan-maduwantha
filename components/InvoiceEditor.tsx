
import React, { useRef } from 'react';
import { InvoiceData, LineItem } from '../types';

interface InvoiceEditorProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    const newItems = data.items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "New Item",
      subDescription: "Description here",
      price: 0,
      qty: 1
    };
    // Prepend the new item to the beginning of the array
    onChange({ ...data, items: [newItem, ...data.items] });
  };

  const removeItem = (id: string) => {
    if (data.items.length <= 1) return;
    onChange({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, signatureImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = () => {
    onChange({ ...data, signatureImage: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">General Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Invoice Number</label>
            <input 
              type="text" 
              value={data.invoiceNumber}
              onChange={(e) => onChange({ ...data, invoiceNumber: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Date</label>
            <input 
              type="date" 
              value={data.date}
              onChange={(e) => onChange({ ...data, date: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Recipient Info */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Invoice To (Recipient)</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Client Name</label>
            <input 
              type="text" 
              value={data.clientName}
              onChange={(e) => onChange({ ...data, clientName: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Company Name</label>
            <input 
              type="text" 
              value={data.clientCompany}
              onChange={(e) => onChange({ ...data, clientCompany: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Address / Country</label>
            <input 
              type="text" 
              value={data.clientAddress}
              onChange={(e) => onChange({ ...data, clientAddress: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </section>

      {/* Signature Upload */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Signature</h2>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex flex-col items-center gap-3">
            {data.signatureImage ? (
              <div className="relative group w-full bg-white/5 p-2 rounded flex justify-center">
                <img src={data.signatureImage} alt="Uploaded sign" className="max-h-12 object-contain filter invert opacity-80" />
                <button 
                  onClick={clearSignature}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[10px] text-slate-500 mb-2">Upload a transparent PNG signature</p>
                <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs transition-colors">
                  Choose File
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleSignatureUpload} 
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Items Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Invoice Items</h2>
          <button 
            onClick={addItem}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors"
          >
            + Add Row
          </button>
        </div>
        
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 relative group">
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
              
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Item Title"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  className="w-full bg-transparent font-bold text-sm focus:outline-none border-b border-slate-700 focus:border-red-500 pb-1"
                />
                <input 
                  type="text" 
                  placeholder="Small description"
                  value={item.subDescription}
                  onChange={(e) => handleItemChange(item.id, 'subDescription', e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-400 focus:outline-none border-b border-transparent focus:border-slate-600 pb-1"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Price</label>
                    <div className="relative">
                        <span className="absolute left-2 top-2 text-slate-500 text-xs">$</span>
                        <input 
                        type="number" 
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-900 border border-slate-700 rounded pl-5 pr-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                    </div>
                  </div>
                  <div className="w-20">
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Qty</label>
                    <input 
                      type="number" 
                      value={item.qty}
                      onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tax/Discount */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Taxes & Discounts</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Tax (%)</label>
            <input 
              type="number" 
              value={data.taxRate}
              onChange={(e) => onChange({ ...data, taxRate: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-400">Discount (%)</label>
            <input 
              type="number" 
              value={data.discountRate}
              onChange={(e) => onChange({ ...data, discountRate: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceEditor;
