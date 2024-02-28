// pages/admin/finance/[details].js
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './FinancialDetails.module.css'
import CustomMenuItem from 'src/components/AdminPagesSharedComponents/CustomMenuItem/CustomMenuItem'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import { Calendar, Note } from 'iconsax-react'
import InvoiceProvider, { useInvoiceContext } from 'src/providers/InvoiceProvider'
import axios from 'axios'
import dayjs from 'dayjs'

const FinancialDetailsPage = () => {
  const router = useRouter()
  const { id, type } = router.query
  const [details, setDetails] = useState(null)
  const [bookingDetails, setBookingDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/${type}/${id}`) // Ensure endpoint matches your API route
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

  /***********Fetch Booking Details ************/
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/bookings/${details.booking}`) // Ensure endpoint matches your API route
        setBookingDetails(response.data)
      } catch (err) {
        console.error('Error fetching details:', err)
        setError('Failed to fetch booking details')
      } finally {
        setLoading(false)
      }
    }

    if (details !== null) fetchData()
  }, [details])

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>Error: {error}</div>
  return (
    <InvoiceProvider>
      <div className={styles.financialDetailsPage}>
        <div className={styles.financialDetailsPageInfo}>
          <div className={styles.organizerDetails}>
            <h3 className={styles.sectionUnderLined}>Event Organizer</h3>
            <p>
              {details.organizerFirstName} {details.organizerLastName}
            </p>
            <p>Payment ID: {details._id}</p>
          </div>
          <div className={styles.paymentItemsDetails}>
            <div className={styles.priceTotal}>
              <table className={styles.priceTotalTable}>
                <thead>
                  <tr>
                    <th className={styles.sectionUnderLined}>Item Name</th>
                    <th className={styles.sectionUnderLined}></th>
                    <th className={styles.sectionUnderLined}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{bookingDetails.eventTitle}</td>
                    <td className={styles.underlinedCell}>Sub-Total</td>
                    <td className={styles.underlinedCell}>{details.amount}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className={styles.underlinedCell}>Add Discount</td>
                    <td className={styles.underlinedCell}></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className={styles.underlinedCell}>Add Tax</td>
                    <td className={styles.underlinedCell}>{details.tax}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.menuOptions}>
            <CustomMenuItem
              menuContainer={styles.customMenuItemContainer}
              labelClassName={styles.customMenuItemLabel}
              label='Payment Details'
              subMenuItems={[<PaymentSubItems details={details} />]}
            />
            <CustomMenuItem
              menuContainer={styles.customMenuItemContainer}
              labelClassName={styles.customMenuItemLabel}
              label='Advance Options'
              subMenuItems={[<AdvancedOptionsSubItems details={details} />]}
            />
          </div>
        </div>
        <div className={styles.financialDetailsPagePreview}>
          <h3>Preview</h3>
          <div className={styles.previewHeader}>
            <div className={styles.invoiceDetails}>
              <div className={styles.previewHeaderInvoiceTitle}>
                <h2>Invoice</h2>
                <p>#001381</p>
              </div>
              <div className={styles.previewHeaderInvoiceLogo}>
                <img src='/images/logo.png' alt='agermax-logo' />
              </div>
            </div>
            <div className={styles.previewDate}>
              <div className={styles.previewDateOfIssue}>
                <p>Date of Issue</p>
                <p>{dayjs(details.invoiceDate).format('YYYY-MM-DD')}</p>
              </div>
              <div className={styles.previewDueDate}>
                <p> Date Due</p>
                <p>{dayjs(details.paymentDueDate).format('YYYY-MM-DD')}</p>
              </div>
            </div>
          </div>
          <div className={styles.previewSummary}>
            <h3>
              {details.amount} due {dayjs(details.paymentDueDate).format('YYYY-MM-DD')}
            </h3>
            <div className={styles.bill}>
              <div className={styles.billFrom}>
                <h3>Bill From</h3>
                <p>Agermax</p>
              </div>
              <div className={styles.billTo}>
                <h3>Bill To</h3>
                <p>
                  {details.organizerFirstName} {details.organizerLastName}
                </p>
              </div>
            </div>
            <InvoiceTable details={details} />
            {/* <CustomMenuItem
              menuContainer={styles.customMenuItemContainer}
              labelClassName={styles.customMenuItemLabel}
              label='Edit Payment Details'
              subMenuItems={[<EditSubItems invoiceID={details._id} />]}
            /> */}
          </div>
        </div>
      </div>
    </InvoiceProvider>
  )
}

export const PaymentSubItems = ({ details }) => {
  return (
    <div>
      <p>Due In</p>
      <TabButton>In {dayjs(details.paymentDueDate).diff(dayjs(details.invoiceDate), 'day')} days</TabButton>
      <h4>Payment Gateways</h4>
      <div className={styles.paymentGateway}>
        <input type='checkbox' name='' id='' />
        <span>Credit Card</span>
      </div>
      <div className={styles.paymentGateway}>
        <input type='checkbox' name='' id='' />
        <span>Bank Transfer</span>
      </div>
    </div>
  )
}

export const AdvancedOptionsSubItems = ({ details }) => {
  return (
    <div className={styles.dateOfIssueAndMemoWrapper}>
      <div className={styles.dateOfIssue}>
        <div className={styles.calenderIcon}>
          <Calendar />
        </div>
        <div className={styles.dateOfIssueText}>
          <div>Date of Issue</div>
          <div>{dayjs(details.invoiceDate).format('YYYY-MM-DD')}</div>
        </div>
      </div>
      <div className={styles.memo}>
        <div className={styles.memoIcon}>
          <Note />
        </div>
        <div className={styles.memoText}>
          <div>Payment Due Date</div>
          <div>{dayjs(details.paymentDueDate).format('YYYY-MM-DD')}</div>
        </div>
      </div>
    </div>
  )
}

export const InvoiceTable = ({ details }) => {
  return (
    <table className={styles.invoiceTable}>
      <thead>
        <tr>
          <th style={{ width: '30%' }}>Item</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td className={styles.underlinedCell}>Subtotal</td>
          <td className={styles.underlinedCell}></td>
          <td className={styles.underlinedCell}>{details.amount}</td>
        </tr>
        <tr>
          <td></td>
          <td className={styles.underlinedCell}>Total</td>
          <td className={styles.underlinedCell}></td>
          <td className={styles.underlinedCell}>{details.amount + details.tax}</td>
        </tr>
        <tr>
          <td></td>
          <td className={styles.underlinedCell}>Amount due</td>
          <td className={styles.underlinedCell}></td>
          <td className={styles.underlinedCell}>$0.00</td>
        </tr>
      </tbody>
    </table>
  )
}

export const EditSubItems = ({ invoiceID }) => {
  const { data, updateData, setData } = useInvoiceContext()
  const [paymentDetails, setPaymentDetails] = useState({})

  useEffect(() => {
    const requiredData = data.find(paymentItem => paymentItem.invoiceID === invoiceID)
    setPaymentDetails(requiredData)
  }, [invoiceID])

  const handleFormSubmission = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formDataObject = {}
    formData.forEach((value, key) => {
      formDataObject[key] = value
    })

    setPaymentDetails(current => {
      return { ...current, ...formDataObject }
    })
    // const requiredData = data.find(paymentItem => paymentItem.invoiceID === invoiceID)
    const newData = data.map(paymentItem => {
      if (paymentItem.invoiceID === invoiceID) {
        return { ...paymentItem, ...formDataObject }
      }
      return paymentItem
    })

    console.log(newData)
    // Do something with the extracted data (e.g., update state or send to a server)
    setData(newData)
  }

  const handleChange = e => {
    const name = e.target.name
  }

  return (
    <form onSubmit={e => handleFormSubmission(e)}>
      <div className={styles.formInput}>
        <label htmlFor='bookerFirstName' className={styles.formInputLabel}>
          First Name:{' '}
        </label>
        <input
          className={styles.editInputField}
          type='text'
          defaultValue={paymentDetails.bookerFirstName}
          id='bookerFirstName'
          name='bookerFirstName'
        />
      </div>
      <div className={styles.formInput}>
        <label htmlFor='bookerLastName' className={styles.formInputLabel}>
          Last Name:{' '}
        </label>
        <input
          className={styles.editInputField}
          type='text'
          value={paymentDetails.bookerLastName}
          id='bookerLastName'
          name='bookerLastName'
          onChange={e => handleChange(e)}
        />
      </div>
      <div className={styles.formInput}>
        <label htmlFor='amount' className={styles.formInputLabel}>
          Amount ($) :{' '}
        </label>
        <input
          className={styles.editInputField}
          type='text'
          defaultValue={paymentDetails.amount}
          id='amount'
          name='amount'
        />
      </div>
      <div className={styles.formInput}>
        <label htmlFor='date' className={styles.formInputLabel}>
          Date:{' '}
        </label>
        <input className={styles.editInputField} type='date' defaultValue={paymentDetails.date} id='date' name='date' />
      </div>
      <div className={styles.formInput}>
        <label htmlFor='status' className={styles.formInputLabel}>
          Status:{' '}
        </label>
        <select className={styles.editInputField} name='status' id='status'>
          <option value=''>-- Select --</option>
          {/* defaultValue={paymentDetails.status} */}
          <option value='Pending'>Pending</option>
          <option value='Paid'>Paid</option>
        </select>
      </div>
      <TabButton className={styles.submitButton}>Save Changes</TabButton>
    </form>
  )
}

export default FinancialDetailsPage

FinancialDetailsPage.authGuard = false
FinancialDetailsPage.guestGuard = false
FinancialDetailsPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// FinancialDetailsPage.getLayout = page => <div>{page}</div>
