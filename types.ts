
export interface LineItem {
  id: string;
  description: string;
  subDescription: string;
  price: number;
  qty: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  items: LineItem[];
  taxRate: number;
  discountRate: number;
  signatureImage?: string; // Base64 encoded image string
}

export const DEFAULT_INVOICE: InvoiceData = {
  invoiceNumber: "00010118",
  date: new Date().toISOString().split('T')[0],
  clientName: "Robert Madeira",
  clientCompany: "Legacy Overland",
  clientAddress: "USA",
  items: [
    {
      id: "1",
      description: "Project Texan",
      subDescription: "Description here",
      price: 25.00,
      qty: 1
    },
    {
      id: "2",
      description: "Texan short",
      subDescription: "Description here",
      price: 15.00,
      qty: 2
    },
    {
      id: "3",
      description: "THE ART OF CLASSIC UPHOLSTERY",
      subDescription: "Description here",
      price: 25.00,
      qty: 1
    },
    {
      id: "4",
      description: "Project resolute",
      subDescription: "Description here",
      price: 25.00,
      qty: 1
    },
    {
      id: "5",
      description: "Project Jolly",
      subDescription: "Description here",
      price: 25.00,
      qty: 1
    }
  ],
  taxRate: 0,
  discountRate: 0,
  signatureImage: undefined
};
