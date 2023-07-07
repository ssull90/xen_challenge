export interface Invoice {
  id: number
  invoice_number: string,
  amount: number,
  state: string,
  due_date: string,
  created_at: string,
  updated_at: string
}

export interface InvoiceStateResponse {
  message: string,
  invoice: Invoice
}