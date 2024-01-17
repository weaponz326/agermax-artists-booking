import Router from 'next/router'
import styles from './button.module.css'
const Button = ({ buttonText, type }) => {
  return (
    <button type={type} className={`${styles['book-now']} ${styles['btn-gen']}`}>
      {buttonText}
    </button>
  )
}

export default Button
