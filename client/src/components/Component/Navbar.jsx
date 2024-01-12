export default function Navbar() {
  return (
    <div className='top-bar nav-bar'>
      <div className='logo first-img'>
        <img
          className='logo-img '
          alt='App dark'
          src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </div>
      <div className='search-component'>
        <input className='search-field' type='search' name='' id='' placeholder='&#128269; Find amazing artist....' />
      </div>
      <div className='logo last-img'>
        <img
          className='logo-img '
          alt='Ellipse'
          src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </div>
    </div>
  )
}
