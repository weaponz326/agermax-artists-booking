// pages/admin/finance/[details].js
import React from 'react'
import { useRouter } from 'next/router'
import styles from './FinancialDetails.module.css'
import Dropdown from 'antd/es/dropdown/dropdown'
import CustomMenuItem from 'src/components/AdminPagesSharedComponents/CustomMenuItem/CustomMenuItem'
import TabButton from 'src/components/AdminPagesSharedComponents/ViewTab/TabButton'

const FinancialDetailsPage = () => {
  const router = useRouter()
  const { paymentId } = router.query

  return (
    <div className={styles.financialDetailsPage}>
      <div className={styles.financialDetailsPageInfo}>
        <div className={styles.organizerDetails}>
          <h3>Event Organizer</h3>
          <p>Organizer Name</p>
        </div>
        <div className={styles.paymentItemsDetails}>
          <div className={styles.paymentItemsTitles}>
            <h3 className={styles.item}>Items</h3>
            <h3 className={styles.price}>Price</h3>
          </div>
          <div className={styles.priceTotal}>
            <div className={styles.priceTotalItemName}>Item Name</div>
            <div className={styles.priceTotals}>
              <div className={styles.priceSubTotals}>
                <div className={styles.priceTotals}>Sub-Total</div>
                <div className={styles.priceTotals}>Sub-Total</div>
              </div>
              <div className={styles.priceTotals}>Sub-Total</div>
              <div className={styles.priceTotals}>Sub-Total</div>
              <div className={styles.priceTotals}>Sub-Total</div>
            </div>
          </div>
        </div>
        <div className={styles.menuOptions}>
          <CustomMenuItem
            menuContainer={styles.customMenuItemContainer}
            labelClassName={styles.customMenuItemLabel}
            label='Payment Details'
            subMenuItems={[<PaymentSubItems />]}
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
export const PaymentSubItems = () => {
  return (
    <div>
      <p>Due In</p>
      <TabButton>In 14 days</TabButton>
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

export const AdvancedOptionsSubItems = () => {
  return (
    <div>
      <div className={styles.dateOfIssue}>
        <input type='checkbox' name='' id='' />
        <span>Credit Card</span>
      </div>
      <div className={styles.memo}>
        <input type='checkbox' name='' id='' />
        <span>Bank Transfer</span>
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
          <td>Subtotal</td>
          <td></td>
          <td>$0.00</td>
        </tr>
        <tr>
          <td></td>
          <td>Total</td>
          <td></td>
          <td>$0.00</td>
        </tr>
        <tr>
          <td></td>
          <td>Amount due</td>
          <td></td>
          <td>$0.00</td>
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
