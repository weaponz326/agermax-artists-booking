import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './FinancialDetails.module.css';
import CustomMenuItem from 'src/components/AdminPagesSharedComponents/CustomMenuItem/CustomMenuItem';
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton';
import { Calendar, Note } from 'iconsax-react';

const FinancialDetailsPage = () => {
  const router = useRouter();
  const { id, type } = router.query;
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/${type}/${id}`); // Ensure endpoint matches your API route
        setDetails(response.data);
      } catch (err) {
        console.error('Error fetching details:', err);
        setError('Failed to fetch details');
      } finally {
        setLoading(false);
      }
    };

    if (id && type) fetchData();
  }, [id, type, baseUrl]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  // This function dynamically renders additional fields based on the data type (invoice or payment)
  const renderAdditionalDetails = () => {
    if (type === 'invoice') {
      return (
        <>
          <tr>
            <td>Email:</td>
            <td>{details.email}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>${details.tax}</td>
          </tr>
        </>
      );
    } else if (type === 'payment') {
      // Example: Add more payment-specific fields here
      return (
        <>
          <tr>
            <td>Organizer Contact:</td>
            <td>{details.organizerContactPhone}</td>
          </tr>
        </>
      );
    }
  };

  return (
    <div className={styles.financialDetailsPage}>
      <div className={styles.financialDetailsPageInfo}>
        <div className={styles.organizerDetails}>
          <h3 className={styles.sectionUnderlined}>Event Organizer</h3>
          <p>{details.organizerFirstName} {details.organizerLastName}</p>
          <p>{type.charAt(0).toUpperCase() + type.slice(1)} ID: {details._id}</p>
        </div>
        <div className={styles.paymentItemsDetails}>
          <div className={styles.priceTotal}>
            <table className={styles.priceTotalTable}>
              <thead>
                <tr>
                  <th className={styles.sectionUnderlined}>Description</th>
                  <th className={styles.sectionUnderlined}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Status:</td>
                  <td>{details.status}</td>
                </tr>
                <tr>
                  <td>Amount:</td>
                  <td>${type === 'payment' ? (details.amount / 100).toFixed(2) : details.amount}</td>
                </tr>
                {renderAdditionalDetails()}
              </tbody>
            </table>
          </div>
        </div>
        <CustomMenuItem
          menuContainer={styles.customMenuItemContainer}
          labelClassName={styles.customMenuItemLabel}
          label="Payment Details"
          subMenuItems={[<PaymentSubItems />]}
        />
        <CustomMenuItem
          menuContainer={styles.customMenuItemContainer}
          labelClassName={styles.customMenuItemLabel}
          label="Advance Options"
          subMenuItems={[<AdvancedOptionsSubItems />]}
        />
      </div>
    </div>
  );
};

const PaymentSubItems = () => {
  // Implement the sub-items for the Payment Details section
  return (
    <div>
      {/* Content goes here */}
    </div>
  );
};

const AdvancedOptionsSubItems = () => {
  // Implement the sub-items for the Advanced Options section
  return (
    <div>
      {/* Content goes here */}
    </div>
  );
};

export default FinancialDetailsPage;
