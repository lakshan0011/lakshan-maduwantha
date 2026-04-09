
import React, { useState } from 'react';
import { InvoiceData, DEFAULT_INVOICE } from './types';
import InvoicePreview from './components/InvoicePreview';
import InvoiceEditor from './components/InvoiceEditor';

const App: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(DEFAULT_INVOICE);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleUpdateInvoice = (updated: InvoiceData) => {
    setInvoice(updated);
  };

  const handleDownload = async () => {
    const element = document.getElementById('invoice-to-download');
    if (!element) return;

    setIsDownloading(true);
    
    const opt = {
      margin: 0,
      filename: `invoice_${invoice.invoiceNumber || 'draft'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore - html2pdf is loaded via script tag
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to print if library fails
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Editor Panel - Hidden during print */}
      <div className="no-print w-full md:w-1/3 lg:w-1/4 bg-slate-900 text-white p-6 shadow-xl overflow-y-auto max-h-screen sticky top-0">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold tracking-tight">Invoice Editor</h1>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`${
              isDownloading ? 'bg-slate-600' : 'bg-red-500 hover:bg-red-600'
            } text-white px-4 py-2 rounded-md font-semibold transition-colors flex items-center gap-2 group disabled:cursor-not-allowed`}
          >
            {isDownloading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" x2="12" y1="15" y2="3"/>
              </svg>
            )}
            {isDownloading ? 'Processing...' : 'Download PDF'}
          </button>
        </div>
        
        <InvoiceEditor 
          data={invoice} 
          onChange={handleUpdateInvoice} 
        />
        
        <div className="mt-12 pt-8 border-t border-slate-700 text-slate-400 text-sm">
          <p>© 2024 Lakshan Maduwantha Template</p>
          <p className="mt-1">Edit items, prices, and date above.</p>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-100 flex justify-center p-4 md:p-8 overflow-y-auto">
        <div className="print-area shadow-2xl" id="invoice-to-download">
          <InvoicePreview data={invoice} />
        </div>
      </div>
    </div>
  );
};

export default App;
