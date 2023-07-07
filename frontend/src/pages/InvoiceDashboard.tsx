import styled from "@emotion/styled"
import InvoiceList from "../widgets/InvoiceList"

const InvoiceHeader = styled('h1')`
  font-size: 2rem;
`

const InvoiceDashboard = () => {
  return (
    <div>
      <InvoiceHeader>Invoice Dashboard</InvoiceHeader>
      <InvoiceList />
    </div>
  )
}

export default InvoiceDashboard