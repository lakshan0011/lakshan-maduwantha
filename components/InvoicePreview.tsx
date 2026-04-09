
import React from 'react';
import { InvoiceData } from '../types';

interface InvoicePreviewProps {
  data: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ data }) => {
  const subTotal = data.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const taxAmount = (subTotal * data.taxRate) / 100;
  const discountAmount = (subTotal * data.discountRate) / 100;
  const grandTotal = subTotal + taxAmount - discountAmount;

  return (
    <div className="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto shadow-2xl relative flex flex-col text-[#333]">
      {/* Header */}
      <div className="flex justify-between items-start mb-16">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white w-14 h-14 flex items-center justify-center font-bold text-2xl rounded-sm">
            Lm
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-widest uppercase">LAKSHAN MADUWANTHA</h1>
            <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mt-0.5">DREAM IT AND MAKE IT</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-extrabold tracking-tighter uppercase mb-1">INVOICE</h2>
          <p className="text-gray-500 font-medium text-sm">#{data.invoiceNumber}</p>
        </div>
      </div>

      {/* Invoice Details Info */}
      <div className="flex justify-between items-start mb-12">
        <div className="max-w-[250px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">INVOICE TO:</p>
          <h3 className="text-xl font-bold mb-1">{data.clientName}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{data.clientCompany}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{data.clientAddress}</p>
        </div>
        
        <div className="flex border-l-4 border-red-500">
            <div className="px-6 py-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Invoice Number</p>
                <p className="font-semibold text-gray-700 text-sm">{data.invoiceNumber}</p>
            </div>
            <div className="px-6 py-1 border-l border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date Information</p>
                <p className="font-semibold text-gray-700 text-sm">{data.date}</p>
            </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="flex-grow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#ef4444] text-white">
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest uppercase w-16 text-center">NO</th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest uppercase">ITEM DESCRIPTION</th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest uppercase text-right w-24">PRICE</th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest uppercase text-center w-24">QTY</th>
              <th className="py-4 px-4 text-[11px] font-bold tracking-widest uppercase text-right w-32">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100 last:border-0">
                <td className="py-6 px-4 text-sm font-semibold text-gray-500 text-center">
                  {(index + 1).toString().padStart(2, '0')}.
                </td>
                <td className="py-6 px-4">
                  <h4 className="font-bold text-sm uppercase mb-1">{item.description}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">{item.subDescription}</p>
                </td>
                <td className="py-6 px-4 text-right text-gray-600 font-medium text-sm">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-6 px-4 text-center text-gray-600 font-medium text-sm">
                  {item.qty}
                </td>
                <td className="py-6 px-4 text-right font-bold text-sm">
                  ${(item.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Totals and Info */}
      <div className="mt-12 flex justify-between items-start">
        <div className="w-1/2 space-y-8">
          <div>
            <h5 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-3">Payment Method</h5>
            <div className="text-sm space-y-1.5 text-gray-500 font-medium">
              <p><span className="text-gray-800 font-bold">Bank Account:</span> 5000654550</p>
              <p><span className="text-gray-800 font-bold">Bank Name:</span> Commercial Bank</p>
              <p><span className="text-gray-800 font-bold">Bank Code:</span> 7056</p>
            </div>
          </div>

          <div>
            <h5 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-3">Terms & Condition</h5>
            <p className="text-[11px] text-gray-400 leading-relaxed font-medium pr-12">
              Payment is kindly requested within the monthly billing period. 
              Access to services and deliverables will continue once the monthly 
              payment is received. Thank you for your cooperation.
            </p>
          </div>

          <div className="pt-4">
            <div className="relative min-w-32 min-h-[48px] mb-2 flex items-end">
                {data.signatureImage ? (
                  <img src={data.signatureImage} alt="Signature" className="max-h-16 object-contain" />
                ) : (
                  <div className="h-12 w-32"></div>
                )}
            </div>
            <div className="border-t border-gray-200 w-32 mb-1"></div>
            <p className="text-xs font-bold text-gray-800">Lakshan</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CEO</p>
          </div>
        </div>

        <div className="w-[300px] flex flex-col items-end">
          <div className="w-full space-y-3 mb-6">
            <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-800">Sub Total:</span>
                <span className="font-medium text-gray-500">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-800">Tax ({data.taxRate}%):</span>
                <span className="font-medium text-gray-500">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-800">Discount ({data.discountRate}%):</span>
                <span className="font-medium text-gray-500">-${discountAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-[#ef4444] text-white w-full py-4 px-6 flex justify-between items-center rounded-sm">
            <span className="font-bold uppercase tracking-widest text-[11px]">GRAND TOTAL:</span>
            <span className="text-2xl font-black">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className="mt-16 pt-8 border-t-0 flex flex-col items-end gap-2">
        <h6 className="text-[#ef4444] font-black text-xl italic pr-2">Thank you for your business!</h6>
        <div className="flex gap-6 text-[10px] font-bold text-gray-400 tracking-wider">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-[#ef4444]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.509-8.954.058-.028 2.022-1.003 2.022-1.003l-3.522-6.796c-.017.01-1.962.905-2.041.947-4.831 2.307.816 14.733 4.625 16.537l.04.019c.153.072 1.511.71 1.511.71l.033.016c.304.145 6.136 3.111 7.373 4.305.102.099.303.018.547-.02l3.522-6.796c-.011.006-2.001.983-2.016.99z"/></svg>
            +94 72 06 80 740
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-[#ef4444]" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.138h-18.745l5.479-8.133zm8.171-1.259l4.653-3.771v9.43l-4.653-5.659z"/></svg>
            lakshanmaduwantha.lm@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
