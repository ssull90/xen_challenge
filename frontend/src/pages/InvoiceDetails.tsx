import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOneInvoice, postInvoiceAction } from '../api/fetchInvoices'
import styled from '@emotion/styled'
import { Invoice, InvoiceAction, InvoiceState } from '../types'
import XenButton from '../shared_components/XenButton'
import XenConfirmationModal from '../shared_components/XenConfirmationModal'
import { IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const InvoiceHeader = styled('h1')`
  font-size: 2rem;
`

const TableContainer = styled('div')`
  display: flex;
  justify-content: center;
`

const Table = styled('table')`
  border-collapse: collapse;
  text-align: center;
`

const TableCell = styled('td')`
   padding: 8px;
   width: 10rem;
`
const ButtonContainer = styled('div')`
  display: flex;
  gap: 1rem;
  justify-content: center;
`

const InvoiceDetails = () => {
  const { id } = useParams()
  const [invoice, setInvoice] = useState<Invoice>()
  const [futureState, setFutureState] = useState<InvoiceState>()
  const [invoiceAction, setInvoiceAction] = useState<InvoiceAction>()
  const [isModal, setIsModal] = useState(false)

  const takeInvoiceAction = async () => {
    try {
      if (!invoiceAction || !id) throw Error('No Invoice Action or ID Set')
      const newInvoice = await postInvoiceAction(+id, invoiceAction)
      setInvoice(newInvoice.invoice)
    } catch (error) {
      console.error('Error changing invoice state:', error)
    }
  }

  const stageAction = (action: InvoiceAction, futureState: InvoiceState) => {
    setFutureState(futureState)
    setInvoiceAction(action)
    setIsModal(true)
  }

  const renderActionButtons = (id: number, status: string) => {
    switch (status) {
      case 'created':
        return (
          <ButtonContainer>
            <XenButton onClick={() => stageAction('pay', 'paid')}>
              Pay
            </XenButton>
            <XenButton onClick={() => stageAction('void', 'void')}>
              Void
            </XenButton>
          </ButtonContainer>
        )
      case 'paid':
        return (
          <XenButton onClick={() => stageAction('ship', 'shipped')}>
            Ship
          </XenButton>
        )
      case 'shipped':
        return (
          <XenButton onClick={() => stageAction('complete', 'complete')}>
            Complete
          </XenButton>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    if (id) {
      const getInvoice = async () => {
        const invoiceResource = await getOneInvoice(+id)
        setInvoice(invoiceResource)
      };

      getInvoice();
    }
  }, [id])


  return (
    <>
      <Link to="/">
        <IconButton sx={{ position: 'absolute', left: '4rem', color: 'black', marginTop: '1rem' }} color="inherit" aria-label="back">
          <ArrowBackIosIcon fontSize='large' />
        </IconButton>
      </Link>
      <InvoiceHeader>Invoice Details</InvoiceHeader>
      <TableContainer>
        <Table>
          <tbody>
            <tr>
              <TableCell>Invoice Number:</TableCell>
              <TableCell>{invoice?.invoice_number}</TableCell>
            </tr>
            <tr>
              <TableCell>Amount:</TableCell>
              <TableCell>{invoice?.amount}</TableCell>
            </tr>
            <tr>
              <TableCell>Due Date:</TableCell>
              <TableCell>{invoice?.due_date}</TableCell>
            </tr>
            <tr>
              <TableCell>State:</TableCell>
              <TableCell>{invoice?.state}</TableCell>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
      {invoice && id ? renderActionButtons(+id, invoice.state) : null}
      <XenConfirmationModal confirmFn={takeInvoiceAction} closeFn={setIsModal} open={isModal}><span>{`Are you sure you want to mark invoice ${invoice?.invoice_number} as ${futureState}?`}</span></XenConfirmationModal>
    </>

  )
}

export default InvoiceDetails