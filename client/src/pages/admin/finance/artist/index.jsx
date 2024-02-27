import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, Space } from 'antd';
import styles from './ArtistFinance.module.css';
import axios from 'axios';

const ArtistFinance = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false); // Define loading state
  const [error, setError] = useState(null); // Define error state
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Your API's base URL

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/payments`);
        console.log(response.data); // Verify the response structure
        // Assuming the payments array is directly the response data
        setPayments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
        setError('Failed to fetch payments'); // Use setError to handle errors
      } finally {
        setLoading(false); // Ensure loading is set to false after the operation
      }
    };

    fetchPayments();
  }, [baseUrl]);

  const columns = [
    {
      title: 'Organizer',
      key: 'organizer',
      render: (_, record) => `${record.organizerFirstName} ${record.organizerLastName}`
    },
    {
      title: 'Contact',
      dataIndex: 'organizerContactPhone',
      key: 'organizerContactPhone',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₵${(amount / 100).toFixed(2)}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ViewDetailsAction
            id={record._id}
            organizer={`${record.organizerFirstName} ${record.organizerLastName}`}
            amount={record.amount}
            date={record.createdAt}
            status={record.status}
          />
        </Space>
      )
    }
  ];

  return (
    <div className={styles.financePage}>
      <Table columns={columns} dataSource={payments} rowKey="_id" />
    </div>
  );
};

export default ArtistFinance;

export const ViewDetailsAction = ({ id, organizer, amount, date, status }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push({
        pathname: `/admin/finance/artist/details/${id}`,
        query: { organizer, amount, date, status }
      })}
      className={styles.viewDetailsActionWrapper}
    >
      View Details
    </div>
  );
};
