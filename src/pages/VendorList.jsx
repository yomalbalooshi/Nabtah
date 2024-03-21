const VendorList = ({ vendors }) => {
  return (
    <div>
      <h2>vendorlist</h2>
      <div className="flex justify-around mt-20 text-center">
        {vendors.map((vendor) => (
          <div className=" flex flex-col" key={vendor._id}>
            <img className=" max-w-96" src={vendor.avatar} alt={vendor.name} />
            <h2>{vendor.name}</h2>
            <p>{vendor.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VendorList
