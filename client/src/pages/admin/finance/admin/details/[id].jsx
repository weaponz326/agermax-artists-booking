import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from './FinancialDetails.module.css'

const FinancialDetailsPage = () => {
  const router = useRouter()
  const { id, type } = router.query
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/${type}/${id}`)
        setDetails(response.data)
      } catch (err) {
        console.error('Error fetching details:', err)
        setError('Failed to fetch details')
      } finally {
        setLoading(false)
      }
    }

    if (id && type) fetchData()
  }, [id, type, baseUrl])

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>Error: {error}</div>

  // Dynamic field rendering based on type
  const renderDetailsBasedOnType = () => {
    if (type === 'invoice') {
      return (
        <>
          <div className={styles.detailItem}>Invoice Date: {new Date(details.invoiceDate).toLocaleDateString()}</div>
          <div className={styles.detailItem}>
            Payment Due Date: {new Date(details.paymentDueDate).toLocaleDateString()}
          </div>
        </>
      )
    } else if (type === 'payment') {
      return (
        <>
          <div className={styles.detailItem}>Payment Date: {new Date(details.createdAt).toLocaleDateString()}</div>
          <div className={styles.detailItem}>Stripe ID: {details.stripeId}</div>
        </>
      )
    }
  }

  return (
    <div className={styles.financialDetailsContainer}>
      <h1>{type.charAt(0).toUpperCase() + type.slice(1)} Details</h1>
      <div className={styles.details}>
        <div className={styles.detailItem}>ID: {details._id}</div>
        <div className={styles.detailItem}>
          Amount: ${type === 'payment' ? (details.amount / 100).toFixed(2) : details.amount}
        </div>
        <div className={styles.detailItem}>Status: {details.status}</div>
        {renderDetailsBasedOnType()}
        <div className={styles.detailItem}>Organizer ID: {details.organizerId || details.organizer}</div>
        <div className={styles.detailItem}>
          Organizer Name: {details.organizerFirstName} {details.organizerLastName}
        </div>
        <div className={styles.detailItem}>Organizer Email: {details.organizerEmail}</div>
        <div className={styles.detailItem}>Organizer Phone: {details.organizerContactPhone}</div>
        {/* Additional fields can be rendered based on your requirement */}
      </div>
    </div>
  )
}

export default FinancialDetailsPage
