import { useState, useEffect } from 'react'
import { Panel } from 'primereact/panel'
import { Card } from 'primereact/card'
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
        <Panel header="Plants" toggleable>
          <p>Plants will go here</p>
        </Panel>
        <Panel header="Packages" toggleable>
          <p>Packages will go here!</p>
        </Panel>
        <Panel header="Tools" toggleable>
          <p>Tools will go here!</p>
        </Panel>
        <Panel header="Services" toggleable>
          <p>Subscribed services will go here!</p>
        </Panel>
      </div>
    )
  )
}
export default VendorProfileInfo
