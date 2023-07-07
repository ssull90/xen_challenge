import { vi, MockInstance } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import InvoiceDetails from './InvoiceDetails';
import * as fetchInvoices from '../api/fetchInvoices';
import { render, waitFor } from '@testing-library/react';

vi.mock('../api/fetchInvoices', () => ({
  getOneInvoice: vi.fn(),
  postInvoiceAction: vi.fn(),
}));

describe('InvoiceDetails', () => {
  const mockInvoice = {
    id: 1,
    invoice_number: 'INV-001',
    amount: 100,
    due_date: '2023-07-01',
    state: 'created',
    created_at: '2023-07-01',
    updated_at: '2023-07-01'
  };


  let getOneInvoiceMock: MockInstance;
  let postInvoiceActionMock: MockInstance;

  beforeEach(() => {
    getOneInvoiceMock = vi.spyOn(fetchInvoices, 'getOneInvoice').mockResolvedValue(mockInvoice);
    postInvoiceActionMock = vi.spyOn(fetchInvoices, 'postInvoiceAction').mockResolvedValue({
      message: 'yay',
      invoice: { ...mockInvoice, state: 'paid' },
    });
  });

  afterEach(() => {
    getOneInvoiceMock.mockRestore();
    postInvoiceActionMock.mockRestore();
  });

  it('displays the invoice details', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/invoices/1']}>
        <Routes>
          <Route path="/invoices/:id" Component={InvoiceDetails}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getOneInvoiceMock).toHaveBeenCalledTimes(1);
      expect(getOneInvoiceMock).toHaveBeenCalledWith(1);
    });

    expect(getByText('Invoice Number:')).toBeInTheDocument();
    expect(getByText('INV-001')).toBeInTheDocument();
    expect(getByText('Amount:')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('Due Date:')).toBeInTheDocument();
    expect(getByText('2023-07-01')).toBeInTheDocument();
    expect(getByText('State:')).toBeInTheDocument();
    expect(getByText('created')).toBeInTheDocument();
  });

  it('renders action buttons based on invoice state', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/invoices/1']}>
        <Routes>
          <Route path="/invoices/:id" Component={InvoiceDetails}>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getOneInvoiceMock).toHaveBeenCalledTimes(1);
      expect(getOneInvoiceMock).toHaveBeenCalledWith(1);
    });

    expect(getByText('Pay')).toBeInTheDocument();
    expect(getByText('Void')).toBeInTheDocument();
  });

});
