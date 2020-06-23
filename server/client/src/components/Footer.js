import React from 'react'

function Footer() {
  return (
    <div
      className='footer-copyright'
      style={{ position: 'fixed', bottom: '0px', width: 'inherit', textAlign: 'center' }}
    >
      <div className='container'>© {new Date().getFullYear()} Made by Umesh Bhat</div>
    </div>
  )
}

export default Footer
