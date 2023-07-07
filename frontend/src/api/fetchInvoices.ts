import { Invoice, InvoiceAction, InvoiceStateResponse } from '../types'

export const fetchInvoices = () => wrapPromise(getInvoices())

export interface Resource<A> {
  read: () => never | A
}

const url = new URL('http://localhost:3000/invoices')

const getInvoices = () =>
  new Promise<Invoice[]>((resolve, reject) => {
    fetch(url)
      .then((result) => resolve(result.json()))
      .catch((error) => reject(error))
  })

export const getOneInvoice = (id: number) =>
  new Promise<Invoice>((resolve, reject) => {
    fetch(`${url}/${id}`)
      .then((result) => resolve(result.json()))
      .catch((error) => reject(error))
  })

export const postInvoiceAction = (id: number, action: InvoiceAction) =>
  new Promise<InvoiceStateResponse>((resolve, reject) => {
    fetch(`${url}/${id}/${action}`, { method: "POST" })
      .then((result) => resolve(result.json()))
      .catch((error) => reject(error))
  })


const wrapPromise = <A>(promise: Promise<A>) => {
  let result: "pending" | Error | A = "pending"

  const setResult = (newResult: typeof result) => {
    result = newResult
  }

  const suspender = promise.then(setResult).catch(setResult)

  const resource: Resource<A> = {
    read() {
      if (result === "pending") {
        throw suspender
      } else if (result instanceof Error) {
        console.error('Error fetching invoices')
        throw result
      } else {
        return result
      }
    }
  }

  return resource
}
