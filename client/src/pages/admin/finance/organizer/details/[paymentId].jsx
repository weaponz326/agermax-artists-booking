// pages/admin/finance/[details].js
import React from 'react'
import { useRouter } from 'next/router'
import styles from './FinancialDetails.module.css'
import CustomMenuItem from 'src/components/AdminPagesSharedComponents/CustomMenuItem/CustomMenuItem'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'
import CalendarIcon from 'src/components/AdminPagesSharedComponents/CalendarIcon/CalendarIcon'
import { Calendar, Note } from 'iconsax-react'

const FinancialDetailsPage = () => {
  const router = useRouter()
  const { paymentId, payee, amount, date, status } = router.query

  return (
    <div className={styles.financialDetailsPage}>
      <div className={styles.financialDetailsPageInfo}>
        <div className={styles.organizerDetails}>
          <h3 className={styles.sectionUnderLined}>Event Organizer</h3>
          <p>{payee}</p>
          <p>Payment ID: {paymentId}</p>
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
                  <td>Item Name</td>
                  <td className={styles.underlinedCell}>Sub-Total</td>
                  <td className={styles.underlinedCell}>{amount}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className={styles.underlinedCell}>Add Discount</td>
                  <td className={styles.underlinedCell}></td>
                </tr>
                <tr>
                  <td></td>
                  <td className={styles.underlinedCell}>Add Tax</td>
                  <td className={styles.underlinedCell}></td>
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
            subMenuItems={[
              <PaymentSubItems amount={amount} date={date} status={status} paymentId={paymentId} payee={payee} />
            ]}
          />
          <CustomMenuItem
            menuContainer={styles.customMenuItemContainer}
            labelClassName={styles.customMenuItemLabel}
            label='Advance Options'
            subMenuItems={[<AdvancedOptionsSubItems />]}
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
              <p>Jan 21, 2024</p>
            </div>
            <div className={styles.previewDueDate}>
              <p> Date Due</p>
              <p>Jan 21, 2024</p>
            </div>
          </div>
        </div>
        <div className={styles.previewSummary}>
          <h3>$0.00 due Feb 4, 2024</h3>
          <div className={styles.bill}>
            <div className={styles.billFrom}>
              <h3>Bill From</h3>
              <p>Company Details</p>
              <p>Company Details</p>
              <p>Company Details</p>
              <p>Company Details</p>
            </div>
            <div className={styles.billTo}>
              <h3>Bill To</h3>
            </div>
          </div>
          <InvoiceTable />
        </div>
      </div>
    </div>
  )
}
export const PaymentSubItems = ({ paymentId, payee, amount, date, status }) => {
  const router = useRouter()

  return (
    <div>
      <p>Due In</p>
      <TabButton>In 20 days</TabButton>
      <h4>Payment Gateways</h4>
      <div className={styles.paymentGateway}>
        <span
          onClick={() =>
            router.push({
              pathname: `/admin/finance/organizer/details/stripe-payment/${paymentId}`,
              query: { payee, paymentId, amount, date, status }
            })
          }
          className={styles.stripePaymentGateway}
        >
          Stripe Payment
        </span>
      </div>
      {/* <div className={styles.paymentGateway}>
        <input type='checkbox' name='' id='' />
        <span>Bank Transfer</span>
      </div> */}
    </div>
  )
}

export const AdvancedOptionsSubItems = () => {
  return (
    <div className={styles.dateOfIssueAndMemoWrapper}>
      <div className={styles.dateOfIssue}>
        <div className={styles.calenderIcon}>
          <Calendar />
        </div>
        <div className={styles.dateOfIssueText}>
          <div>Date of Issue</div>
          <div>21-03-2024</div>
        </div>
      </div>
      <div className={styles.memo}>
        <div className={styles.memoIcon}>
          <Note />
        </div>
        <div className={styles.memoText}>
          <div>Memo</div>
          <div>21-03-2024</div>
        </div>
      </div>
    </div>
  )
}

export const InvoiceTable = () => {
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
          <td className={styles.underlinedCell}>$0.00</td>
        </tr>
        <tr>
          <td></td>
          <td className={styles.underlinedCell}>Total</td>
          <td className={styles.underlinedCell}></td>
          <td className={styles.underlinedCell}>$0.00</td>
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

export default FinancialDetailsPage

FinancialDetailsPage.authGuard = false
FinancialDetailsPage.guestGuard = false
FinancialDetailsPage.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

// FinancialDetailsPage.getLayout = page => <div>{page}</div>
