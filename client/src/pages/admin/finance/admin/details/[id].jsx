// pages/admin/finance/[details].js
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './FinancialDetails.module.css'
import CustomMenuItem from 'src/components/AdminPagesSharedComponents/CustomMenuItem/CustomMenuItem'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import { Calendar, Note } from 'iconsax-react'
import { useInvoiceContext } from 'src/providers/InvoiceProvider'
import axios from 'axios'
import dayjs from 'dayjs'
import { useAuth } from 'src/hooks/useAuth'
import { updateInvoice } from 'src/services/invoice'
import { Snackbar, Alert } from '@mui/material'

const FinancialDetailsPage = () => {
  const router = useRouter()
  const { id, type } = router.query
  const [details, setDetails] = useState(null)
  const [bookingDetails, setBookingDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const { setIsUpdated } = useInvoiceContext()

  /****************SnackBar Options***************/
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('info')
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  /****************Invoice Data***************/
  const [invoiceData, setInvoiceData] = useState({
    // booking: details?.booking,
    // amount: details ? details.amount : 0,
    // discount: details?.discount || 0,
    // tax: details?.tax || 0,
    // email: details?.email || '',
    // status: details?.status || 'unpaid',
    // invoiceDate: details?.invoiceDate || dayjs(),
    // paymentDueDate: details?.paymentDueDate || dayjs().add(14, 'day')
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log(router.query)
      setLoading(true)
      try {
        const { data } = await axios.get(`${baseUrl}/${type}/${id}`) // Ensure endpoint matches your API route
        setDetails(data)
        setInvoiceData({ ...data })
      } catch (err) {
        console.error('Error fetching details:', err)
        setError('Failed to fetch details')
      } finally {
        setLoading(false)
      }
    }

    if (id && type) fetchData()
    console.log(invoiceData)
  }, [id, type, baseUrl, snackbarOpen])

  /***********Fetch Booking Details ************/
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${baseUrl}/bookings/${details.booking}`) // Ensure endpoint matches your API route
        setBookingDetails(data)
      } catch (err) {
        console.error('Error fetching details:', err)
        setError('Failed to fetch booking details')
      } finally {
        setLoading(false)
      }
    }

    if (details !== null && type === 'invoice') fetchData()
    // console.log(details)
  }, [details, type])

  const handleChange = e => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value
    })
    console.log(invoiceData)
  }

  const handleInvoiceUpdate = async () => {
    try {
      const updatedInvoice = await updateInvoice(invoiceData)
      console.log('Invoice Updated Successfully! : ', updatedInvoice)
      setSnackbarMessage('Invoice Updated Successfully!')
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
      setIsUpdated(true)
    } catch (error) {
      console.error('Error updating invoice: ', error)
      // Handle error, e.g., display an error message to the user
      setSnackbarMessage('Error updating invoice!')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    } finally {
      setIsUpdated(false)
    }
  }

  /****************Rendering***************/

  if (loading) return <div className={styles.loading}>Loading...</div>
  if (error) return <div className={styles.error}>Error: {error}</div>
  return (
    <div className={styles.financialDetailsPage}>
      {/* Condition Rendering of Preview and Details */}
      {type === 'invoice' && user.role === 'admin' && (
        <div className={styles.financialDetailsPageInfo}>
          <div className={styles.organizerDetails}>
            <h3 className={styles.sectionUnderLined}>Event Organizer</h3>
            <p>
              {invoiceData.organizerFirstName} {invoiceData.organizerLastName}
            </p>
            <p>Invoice ID: {invoiceData._id}</p>
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
                    <td className={styles.underlinedCell}>
                      <input
                        type='number'
                        min={0}
                        className={`${styles.itemName} ${styles.itemPrice}`}
                        value={invoiceData.amount}
                        name='amount'
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className={styles.underlinedCell}>Add Discount</td>
                    <td className={styles.underlinedCell}>
                      <input
                        className={`${styles.itemName} ${styles.itemPrice}`}
                        value={invoiceData.discount}
                        name='discount'
                        onChange={handleChange}
                        type='number'
                        min={0}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className={styles.underlinedCell}>Add Tax</td>
                    <td className={styles.underlinedCell}>
                      <input
                        className={`${styles.itemName} ${styles.itemPrice}`}
                        value={invoiceData.tax}
                        name='tax'
                        onChange={handleChange}
                        type='number'
                        min={0}
                      />
                    </td>
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
              subMenuItems={[<PaymentSubItems details={details} invoiceData={invoiceData} />]}
            />
            <CustomMenuItem
              menuContainer={styles.customMenuItemContainer}
              labelClassName={styles.customMenuItemLabel}
              label='Advance Options'
              subMenuItems={[
                <AdvancedOptionsSubItems details={details} invoiceData={invoiceData} handleChange={handleChange} />
              ]}
            />
          </div>
          <TabButton className={styles.saveChangesBtn} onClick={handleInvoiceUpdate}>
            Save Changes
          </TabButton>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'down', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }} variant='filled'>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      )}

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
              <p>{dayjs(invoiceData.invoiceDate).format('YYYY-MM-DD')}</p>
            </div>
            <div className={styles.previewDueDate}>
              <p> Date Due</p>
              <p>{dayjs(invoiceData.paymentDueDate).format('YYYY-MM-DD')}</p>
            </div>
          </div>
        </div>
        <div className={styles.previewSummary}>
          <h3>
            {invoiceData.amount} due {dayjs(invoiceData.paymentDueDate).format('YYYY-MM-DD')}
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
          {type === 'invoice' && (
            <InvoiceTable details={details} bookingDetails={bookingDetails} invoiceData={invoiceData} />
          )}
          {type === 'payments' && <PaymentTable details={details} />}
          {/* <CustomMenuItem
              menuContainer={styles.customMenuItemContainer}
              labelClassName={styles.customMenuItemLabel}
              label='Edit Payment Details'
              subMenuItems={[<EditSubItems invoiceID={details._id} />]}
            /> */}
        </div>
      </div>
    </div>
  )
}

export const PaymentSubItems = ({ details, invoiceData }) => {
  return (
    <div>
      <p>Due In</p>
      <TabButton>In {dayjs(invoiceData.paymentDueDate).diff(dayjs(invoiceData.invoiceDate), 'day')} days</TabButton>
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

export const AdvancedOptionsSubItems = ({ details, invoiceData, handleChange }) => {
  return (
    <div className={styles.dateOfIssueAndMemoWrapper}>
      <div className={styles.dateOfIssue}>
        <div className={styles.calenderIcon}>
          <Calendar />
        </div>
        <div className={styles.dateOfIssueText}>
          <div className={styles.dateFieldTitle}>Date of Issue</div>
          <input
            type='date'
            className={styles.dateField}
            value={dayjs(invoiceData.invoiceDate).format('YYYY-MM-DD')}
            name='invoiceDate'
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.memo}>
        <div className={styles.memoIcon}>
          <Calendar />
        </div>
        <div className={styles.memoText}>
          <div className={styles.dateFieldTitle}>Payment Due Date</div>
          <input
            type='date'
            className={styles.dateField}
            value={dayjs(invoiceData.paymentDueDate).format('YYYY-MM-DD')}
            name='paymentDueDate'
            onChange={handleChange}
            min={dayjs(invoiceData.invoiceDate).format('YYYY-MM-DD')}
          />
        </div>
      </div>
    </div>
  )
}

export const InvoiceTable = ({ details, bookingDetails, invoiceData }) => {
  return (
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
          <td className={styles.underlinedCell}>{details.discount}</td>
        </tr>
        <tr>
          <td></td>
          <td className={styles.underlinedCell}>Add Tax</td>
          <td className={styles.underlinedCell}>{details.tax}</td>
        </tr>
      </tbody>
    </table>
  )
}
export const PaymentTable = ({ details }) => {
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
          <td>To be fetched later!</td>
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
export const ItemTable = () => {
  return (
    <div className={styles.priceTotalTable}>
      {/* //Rendered Table */}
      <div className={styles.itemsHeaderWrapper}>
        <div className={`${styles.itemsHeader}`}>Item Name</div>
        <div className={`${styles.itemsHeader}`}>Price</div>
      </div>
      <div className={styles.itemsWrapper}>
        <div className={styles.itemName}>{bookingDetails.eventTitle}</div>
        <input
          type='number'
          min={0}
          className={`${styles.itemName} ${styles.itemPrice}`}
          value={invoiceData.amount}
          name='amount'
          onChange={handleChange}
        />
      </div>
      {/* ///Dynamically render more items here! */}

      <div className={styles.itemsWrapper}>
        <div className={`${styles.itemName} ${styles.addItemBtn}`}>Add Item ...</div>
        <div className={`${styles.itemName} ${styles.itemSubTitle}`}>Sub-total</div>
        <input
          type='number'
          min={0}
          className={`${styles.itemName} ${styles.itemPrice}`}
          value={invoiceData.amount}
          name='amount'
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className={styles.itemsWrapper}>
        <div className={`${styles.itemName} ${styles.addItemBtn}`}></div>
        <div className={`${styles.itemName} ${styles.itemSubTitle}`}>Discount(%)</div>
        <input
          className={`${styles.itemName} ${styles.itemPrice}`}
          value={invoiceData.discount}
          name='discount'
          type='number'
          onChange={handleChange}
        />
      </div>
      <div className={styles.itemsWrapper}>
        <div className={`${styles.itemName} ${styles.addItemBtn}`}></div>
        <div className={`${styles.itemName} ${styles.itemSubTitle}`}>Tax(%)</div>
        <input
          className={`${styles.itemName} ${styles.itemPrice}`}
          value={invoiceData.tax}
          name='tax'
          onChange={handleChange}
          type='number'
        />
      </div>
    </div>
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
