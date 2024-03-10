import React, { createContext, useState, useContext, useEffect } from 'react'
import { getAllInvoice } from 'src/services/invoice'

const InvoiceContext = createContext()

const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isUpdated, setIsUpdated] = useState(null)

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
  }, [isUpdated])

  const updateInvoiceData = newData => {
    setInvoiceData(newData)
  }

  return (
    <InvoiceContext.Provider value={{ invoiceData, updateInvoiceData, setInvoiceData, setIsUpdated }}>
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
