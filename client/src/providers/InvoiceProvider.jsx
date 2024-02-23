import React, { createContext, useState, useContext, useEffect } from 'react'
import { getAllInvoice } from 'src/services/invoice'

const InvoiceContext = createContext()

const initialData = [
  {
    _id: 'P001',
    firstName: 'Kofi',
    lastName: 'Fosu',
    contactPhone: '+233 544803023',
    email: 'kfosu@gmail.com',
    amount: '1500',
    status: 'Paid'
  },
  {
    _id: 'P002',
    firstName: 'Kojo ',
    lastName: 'Appiah',
    email: 'kApiah@gmail.com',
    contactPhone: '+233 48235694',
    amount: '700',
    status: 'Pending'
  }
  // add more payment objects here
]

const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /****************Fetch Invoice Data***************/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoice = await getAllInvoice()
        setInvoiceData(invoice)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updateInvoiceData = newData => {
    setInvoiceData(newData)
  }

  return (
    <InvoiceContext.Provider value={{ invoiceData, updateInvoiceData, setInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  )
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
