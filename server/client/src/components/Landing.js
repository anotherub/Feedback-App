import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Link to='/surveys' style={{ color: 'black' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>FeedBox!</h1>
        Collect feedback form your users
      </div>
    </Link>
  )
}

export default Landing
