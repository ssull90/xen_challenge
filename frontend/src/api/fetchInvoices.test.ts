import { fetchInvoices, getOneInvoice, postInvoiceAction, Resource } from './fetchInvoices';
import { Invoice, InvoiceAction, InvoiceStateResponse } from '../types';
import { vi } from 'vitest'

describe('fetchInvoices', () => {
  it('should return a resource for fetching invoices', () => {
    const resource = fetchInvoices();
    expect(typeof resource.read).toBe('function');
  });
});

describe('getOneInvoice', () => {
  it('should fetch a specific invoice', async () => {
    const mockInvoice: Invoice = {
      id: 1,
      invoice_number: 'INV-001',
      amount: 100,
      due_date: '2023-07-01',
      state: 'created',
      created_at: '2023-07-01',
      updated_at: '2023-07-01'
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockInvoice)
    });

    const id = 1;
    const invoice = await getOneInvoice(id);
    expect(invoice).toEqual(mockInvoice);
  });
});

describe('postInvoiceAction', () => {
  it('should post an invoice action', async () => {
    const mockResponse: InvoiceStateResponse = {
      message: 'Action successful',
      invoice: {
        id: 1,
        invoice_number: 'INV-001',
        amount: 100,
        due_date: '2023-07-01',
        state: 'paid',
        created_at: '2023-07-01',
        updated_at: '2023-07-01'
      }
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    });

    const id = 1;
    const action: InvoiceAction = 'pay';
    const response = await postInvoiceAction(id, action);
    expect(response).toEqual(mockResponse);
  });
});
