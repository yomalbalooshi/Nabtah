import { useState, useEffect } from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
const CustomerProfileInfo = ({ authenticatedUser }) => {
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
          {authenticatedUser.orders.map((item, index) => (
            <Card key={index}>
              <p className="m-0">{item._id}</p>
            </Card>
          ))}
        </Panel>
        <Panel header="Owned Plants" toggleable>
          {authenticatedUser.ownedPlants.map((item, index) => (
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
export default CustomerProfileInfo
