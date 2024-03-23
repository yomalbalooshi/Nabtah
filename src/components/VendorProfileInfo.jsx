import { useState, useEffect } from 'react'
const VendorProfileInfo = ({ authenticatedUser }) => {
  const [userDetails, setuserDetails] = useState({})
  useEffect(() => {
    if (authenticatedUser) {
      console.log(authenticatedUser)
    }
  }, [authenticatedUser])

  return (
    authenticatedUser && (
      <div>
        <Panel header="Order History" toggleable>
          {authenticatedUser &&
            authenticatedUser.orders.map((item, index) => (
              <Card key={index}>
                <p className="m-0">{item}</p>
              </Card>
            ))}
        </Panel>
        <Panel header="Owned Plants" toggleable>
          {authenticatedUser.ownedPlants.length > 0 &&
            authenticatedUser.ownedPlants.map((item, index) => (
              <Card key={index}>
                <p className="m-0">{item}</p>
              </Card>
            ))}
        </Panel>

        <Panel header="Subscribed Services" toggleable>
          <p>Subscribed services will go here!</p>
        </Panel>
      </div>
    )
  )
}
export default VendorProfileInfo
