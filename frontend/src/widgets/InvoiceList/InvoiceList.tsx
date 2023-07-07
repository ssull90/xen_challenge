import { Suspense, useState } from 'react'
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { Invoice } from '../../types/Invoice.type'
import { fetchInvoices } from '../../api/fetchInvoices'

const initialRows = fetchInvoices()

const InvoiceList = () => {
  const [rows, _setRows] = useState<Invoice[]>(initialRows.read())
  const navigate = useNavigate()

  return (
    <Suspense fallback={<CircularProgress />}>
      <TableContainer component={Paper} sx={{ margin: '2rem', width: 'auto' }}>
        <Table sx={{ minWidth: 480 }} aria-label="invoices">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>Invoice ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.invoice_number}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:nth-of-type(odd)': { backgroundColor: '#d3d3d36e' },
                  '&:hover': { backgroundColor: '#707070', cursor: 'pointer' }
                }}
                onClick={() => navigate(`/invoice/${row.id}`)}
              >
                <TableCell align="left">{row.invoice_number}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.due_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Suspense>
  )
}

export default InvoiceList
