import { useState, useEffect } from 'react'

const Home = ({ vendors }) => {
  return (
    <div>
      <div>
        <h1>Your garden's second home</h1>
        <h4>One stop for all your gardening needs</h4>
      </div>
      <div>
        <h2>Hottest shops right now!</h2>
        <div>
          {vendors.map((vendor) => (
            <div key={vendor._id}>
              <h2>{vendor.name}</h2>
              <p>{vendor.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
