import Router from 'next/router'
const Button = ({ buttonText, type }) => {
  return (
    <button type={type} className='book-now btn-gen'>
      {buttonText}
    </button>
  )
}

export default Button
