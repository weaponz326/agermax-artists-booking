import React, { createContext, useState, useContext } from 'react'

const FinanceContext = createContext()

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

const FinanceProvider = ({ children }) => {
  const [data, setData] = useState(initialData)
  // console.log(data)

  const updateData = newData => {
    setData(newData)
  }

  return <FinanceContext.Provider value={{ data, updateData, setData }}>{children}</FinanceContext.Provider>
}

const useFinanceContext = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinanceContext must be used within a FinanceProvider')
  }
  return context
}

export { FinanceProvider, useFinanceContext }
