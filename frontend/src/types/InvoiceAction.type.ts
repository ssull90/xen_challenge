export type InvoiceAction = 'pay' | 'ship' | 'complete' | 'void'

export type InvoiceState = 'created' | 'void' | 'paid' | 'shipped' | 'complete'