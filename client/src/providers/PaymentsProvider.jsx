import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllPayments } from 'src/services/payments';

const PaymentsContext = createContext();

const PaymentsProvider = ({ children }) => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payments = await getAllPayments();
        setPaymentsData(payments);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Expose only the data, error, loading state, and function to set payments data
  return (
    <PaymentsContext.Provider value={{ paymentsData, loading, error, setPaymentsData }}>
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsProvider;

const usePaymentsContext = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error('usePaymentsContext must be used within PaymentsProvider');
  }
  return context;
};

export { PaymentsProvider, usePaymentsContext };
