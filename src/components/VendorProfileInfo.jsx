import { useState, useEffect } from 'react'
import { Panel } from 'primereact/panel'
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Rating } from 'primereact/rating'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import 'primeicons/primeicons.css'
import {
  getAllVendorPlants,
  getAllVendorPackages,
  getAllVendorTools,
  getAllVendorServices,
  getAllVendorProduce,
  getVendorDetails,
  getAllVendorOrders
} from '../services/vendor'

const VendorProfileInfo = ({ authenticatedUser, updated }) => {
  let navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({})
  const [vendorPlants, setVendorPlants] = useState(null)
  const [vendorProduce, setVendorProduce] = useState(null)
  const [vendorTools, setVendorTools] = useState(null)
  const [vendorServices, setVendorServices] = useState(null)
  const [vendorPackages, setVendorPackages] = useState(null)
  const [vendorOrders, setvendorOrders] = useState(null)

  console.log(updated)
  useEffect(() => {
    if (authenticatedUser) {
      console.log(authenticatedUser)
      setuserDetails(authenticatedUser)
    }
  }, [authenticatedUser])

  useEffect(() => {
    const handleVendorDetails = async () => {
      const data = await getVendorDetails(authenticatedUser._id)
      setuserDetails(data)
    }
    const handleVendorPlants = async () => {
      const data = await getAllVendorPlants(authenticatedUser._id)
      setVendorPlants(data)
    }
    const handleVendorProduce = async () => {
      const data = await getAllVendorProduce(authenticatedUser._id)
      setVendorProduce(data)
    }
    const handleVendorServices = async () => {
      const data = await getAllVendorServices(authenticatedUser._id)
      setVendorServices(data)
    }
    const handleVendorTools = async () => {
      const data = await getAllVendorTools(authenticatedUser._id)
      setVendorTools(data)
    }
    const handleVendorPackages = async () => {
      const data = await getAllVendorPackages(authenticatedUser._id)
      setVendorPackages(data)
    }
    const handleVendorOrders = async () => {
      const data = await getAllVendorOrders(authenticatedUser._id)
      setvendorOrders(data)
    }
    handleVendorDetails()
    handleVendorPlants()
    handleVendorProduce()
    handleVendorServices()
    handleVendorTools()
    handleVendorPackages()
    handleVendorOrders()
  }, [updated])

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`${product.image}`}
        alt={product.image}
        className="w-20 shadow-md rounded"
      />
    )
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'BHD' })
  }
  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price)
  }
  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    )
  }
  const getSeverity = (product) => {
    switch (product.available) {
      case true:
        return 'success'
      case false:
        return 'danger'
      default:
        return null
    }
  }
  const updateTemplate = (rowData, options) => {
    return (
      <Button
        type="button"
        icon="pi pi-pencil"
        className="p-button-sm p-button-text"
        onClick={() => {
          if (
            options.props.footer.props.rightSideButton.props.label.includes(
              'Plant'
            )
          ) {
            navigate(`/updateplant/${rowData._id}`)
          } else if (
            options.props.footer.props.rightSideButton.props.label.includes(
              'Package'
            )
          ) {
            navigate(`/updatepackage/${rowData._id}`)
          } else if (
            options.props.footer.props.rightSideButton.props.label.includes(
              'Tool'
            )
          ) {
            navigate(`/updatetool/${rowData._id}`)
          } else if (
            options.props.footer.props.rightSideButton.props.label.includes(
              'Produce'
            )
          ) {
            navigate(`/updateproduce/${rowData._id}`)
          } else if (
            options.props.footer.props.rightSideButton.props.label.includes(
              'Service'
            )
          ) {
            navigate(`/updateservice/${rowData._id}`)
          }
        }}
      />
    )
  }
  const plantsBodyTemplate = (rowData) => {
    return (
      <ul>
        {rowData.plants.map((plant) => (
          <li key={plant.id}>&#x2022; {plant.name}</li>
        ))}
      </ul>
    )
  }
  const toolsBodyTemplate = (rowData) => {
    return (
      <ul>
        {rowData.tools.map((tool) => (
          <li key={tool.id}>&#x2022; {tool.name}</li>
        ))}
      </ul>
    )
  }
  const servicesBodyTemplate = (rowData) => {
    return (
      <ul>
        {rowData.services.map((service) => (
          <li key={service.id}>&#x2022; {service.name}</li>
        ))}
      </ul>
    )
  }
  const produceBodyTemplate = (rowData) => {
    return (
      <ul>
        {rowData.produce.map((p) => (
          <li key={p.id}>&#x2022; {p.name}</li>
        ))}
      </ul>
    )
  }

  const DataTableFooter = ({ totalRecords, rightSideButton }) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>Total {totalRecords} Records</div>
        {rightSideButton}
      </div>
    )
  }

  const changeDateFormat = (dateToFormat) => {
    let date = new Date(dateToFormat)
    let formattedDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()

    return formattedDate
  }

  const dateTemplate = (rowData) => {
    let formattedDate = changeDateFormat(rowData.createdAt)
    return <span>{formattedDate}</span>
  }


  return (
    authenticatedUser && (
      <div>
        <div className="p-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl pb-3">
            {userDetails.name}
          </h1>

          <div>
            <div className="pb-10  text-lg">
              <span className="font-semibold ">Location: </span>
              <span>
                {userDetails.location
                  ? userDetails.location
                  : 'Add a location to your profile!'}
              </span>
            </div>
          </div>
          <Button
            className="mb-3 bg-white select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => navigate(`/updateVendor/${userDetails._id}`)}
          >
            Edit Account Details
          </Button>
        </div>
        <Panel header="Plants" toggleable collapsed>
          <div className="card">
            <DataTable
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50, 100]}
              value={vendorPlants}
              footer={
                <DataTableFooter
                  totalRecords={vendorPlants ? vendorPlants.length : 0}
                  rightSideButton={
                    <Button
                      label="Add Plant"
                      onClick={() => navigate(`/addplant/`)}
                    />
                  }
                />
              }
              tableStyle={{ minWidth: '60rem' }}
            >
              <Column header="Image" body={imageBodyTemplate}></Column>
              <Column field="name" header="Name"></Column>
              <Column
                field="price"
                header="Price"
                body={priceBodyTemplate}
              ></Column>
              <Column header="Availability" body={statusBodyTemplate}></Column>
              <Column
                style={{ flex: '0 0 4rem' }}
                body={updateTemplate}
              ></Column>
            </DataTable>
          </div>
        </Panel>
        <Panel header="Produce" toggleable collapsed>
          <DataTable
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            value={vendorProduce}
            footer={
              <DataTableFooter
                totalRecords={vendorPlants ? vendorPlants.length : 0}
                rightSideButton={
                  <Button
                    label="Add Produce"
                    onClick={() => navigate(`/produceform/`)}
                  />
                }
              />
            }
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="name" header="Name"></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column header="Availability" body={statusBodyTemplate}></Column>
            <Column style={{ flex: '0 0 4rem' }} body={updateTemplate}></Column>
          </DataTable>
        </Panel>
        <Panel header="Packages" toggleable collapsed>
          <DataTable
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            value={vendorPackages}
            footer={
              <DataTableFooter
                totalRecords={vendorPlants ? vendorPlants.length : 0}
                rightSideButton={
                  <Button
                    label="Add Package"
                    onClick={() => navigate(`/packageform/`)}
                  />
                }
              />
            }
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column field="name" header="Name"></Column>
            <Column header="Description" field="description"></Column>
            <Column header="Plants" body={plantsBodyTemplate}></Column>
            <Column header="Tools" body={toolsBodyTemplate}></Column>
            <Column header="Produce" body={produceBodyTemplate}></Column>
            <Column header="Services" body={servicesBodyTemplate}></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column header="Availability" body={statusBodyTemplate}></Column>
            <Column style={{ flex: '0 0 4rem' }} body={updateTemplate}></Column>
          </DataTable>
        </Panel>
        <Panel header="Tools" toggleable collapsed>
          <DataTable
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            value={vendorTools}
            footer={
              <DataTableFooter
                totalRecords={vendorPlants ? vendorPlants.length : 0}
                rightSideButton={
                  <Button
                    label="Add Tool"
                    onClick={() => navigate(`/toolform/`)}
                  />
                }
              />
            }
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="name" header="Name"></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column header="Availability" body={statusBodyTemplate}></Column>
            <Column style={{ flex: '0 0 4rem' }} body={updateTemplate}></Column>
          </DataTable>
        </Panel>
        <Panel header="Services" toggleable collapsed>
          <DataTable
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            value={vendorServices}
            footer={
              <DataTableFooter
                totalRecords={vendorPlants ? vendorPlants.length : 0}
                rightSideButton={
                  <Button
                    label="Add Service"
                    onClick={() => navigate(`/serviceform/`)}
                  />
                }
              />
            }
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column field="name" header="Name"></Column>
            <Column header="Description" field="description"></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column header="Availability" body={statusBodyTemplate}></Column>
            <Column style={{ flex: '0 0 4rem' }} body={updateTemplate}></Column>
          </DataTable>
        </Panel>
        <Panel header="Orders" toggleable collapsed>
          <DataTable
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            value={vendorOrders}
            footer={`Total ${vendorOrders ? vendorOrders.length : 0} Orders`}
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column field="_id" header="Order ID"></Column>
            <Column header="quantity" field="quantity"></Column>
            <Column field="itemId.name" header="Item"></Column>

            <Column body={dateTemplate} header="Order Date"></Column>
          </DataTable>
        </Panel>
      </div>
    )
  )
}
export default VendorProfileInfo
