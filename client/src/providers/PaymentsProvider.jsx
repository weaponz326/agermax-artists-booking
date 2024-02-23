import React, { createContext, useState, useContext, useEffect } from 'react'
import { getAllPayments } from 'src/services/payments'

const PaymentsContext = createContext()

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

const PaymentsProvider = ({ children }) => {
  const [paymentsData, setPaymentsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /****************Fetch Payments Data***************/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payments = await getAllPayments()
        setPaymentsData(payments)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const updatePaymentsData = newData => {
    setPaymentsData(newData)
  }

  return (
    <PaymentsContext.Provider value={{ paymentsData, updatePaymentsData, setPaymentsData }}>
      {children}
    </PaymentsContext.Provider>
  )
}

export default PaymentsProvider

const usePaymentsContext = () => {
  const context = useContext(PaymentsContext)
  if (!context) {
    throw new Error('usePaymentsContext must be used within PaymentsProvider')
  }
  return context
}

export { PaymentsProvider, usePaymentsContext }
