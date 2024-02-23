import React, { createContext, useState, useContext, useEffect } from 'react'
import { getAllInvoice } from 'src/services/invoice'

const InvoiceContext = createContext()

const initialData = [
  {
    paymentId: 'P001',
    payeeFirstName: 'Kofi',
    payeeLastName: 'Fosu',
    payeeContact: '+233 544803023',
    amount: '1500',
    date: '2024-01-30',
    status: 'Paid'
  },
  {
    paymentId: 'P002',
    payeeFirstName: 'Kojo ',
    payeeLastName: 'Appiah',
    payeeContact: '+233 48235694',
    amount: '700',
    date: '2024-01-30',
    status: 'Pending'
  }
  // add more payment objects here
]

const InvoiceProvider = ({ children }) => {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /****************Fetch Invoice Data***************/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoice = await getAllInvoice()
        if (invoice) setData(invoice)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateData = newData => {
    setData(newData)
  }

  return <InvoiceContext.Provider value={{ data, updateData, setData }}>{children}</InvoiceContext.Provider>
}

export default InvoiceProvider

const useInvoiceContext = () => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoiceContext must be used within InvoiceProvider')
  }
  return context
}

export { InvoiceProvider, useInvoiceContext }
