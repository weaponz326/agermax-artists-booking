import styles from './button.module.css'
const Button = ({ buttonText, type, customStyles }) => {
  const defaultStyle = styles['default-btn']
  const selectStyle = customStyles ? customStyles : defaultStyle

  return (
    <button type={type} className={selectStyle}>
      {buttonText}
    </button>
  )
}

export default Button
