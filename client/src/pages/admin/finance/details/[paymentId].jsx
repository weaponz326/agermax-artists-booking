// pages/admin/finance/[details].js
import React from 'react'
import { useRouter } from 'next/router'
import styles from './FinancialDetails.module.css'
import Dropdown from 'antd/es/dropdown/dropdown'

const FinancialDetailsPage = () => {
  const router = useRouter()
  const { paymentId } = router.query
  console.log(router.query)

  return (
    <div className={styles.financialDetailsPage}>
      <div className={styles.financialDetailsPageInfo}>
        <div className={styles.organizerDetails}>
          <h3>Event Organizer</h3>
          <hr />
          <p>Organizer Name</p>
        </div>
        <div className={styles.paymentItemsDetails}>
          <div className={styles.paymentItemsTitles}>
            <div className={styles.item}>Item</div>
            <div className={styles.price}>Price</div>
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
        <Dropdown />
        <div className={styles.paymentDetails}></div>
        <div className={styles.advancedOptions}></div>
      </div>
      <div className={styles.financialDetailsPagePreview}></div>
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
