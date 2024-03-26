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
  getVendorDetails
} from '../services/vendor'

const VendorProfileInfo = ({ authenticatedUser, updated }) => {
  let navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({})
  const [vendorPlants, setVendorPlants] = useState(null)
  const [vendorProduce, setVendorProduce] = useState(null)
  const [vendorTools, setVendorTools] = useState(null)
  const [vendorServices, setVendorServices] = useState(null)
  const [vendorPackages, setVendorPackages] = useState(null)
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
    handleVendorDetails()
    handleVendorPlants()
    handleVendorProduce()
    handleVendorServices()
    handleVendorTools()
    handleVendorPackages()
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
          if (options.props.footer.includes('Plants')) {
            navigate(`/updateplant/${rowData._id}`)
          } else if (options.props.footer.includes('Packages')) {
            navigate(`/updatepackage/${rowData._id}`)
          } else if (options.props.footer.includes('Tools')) {
            navigate(`/updatetool/${rowData._id}`)
          } else if (options.props.footer.includes('Produce')) {
            navigate(`/updateproduce/${rowData._id}`)
          } else if (options.props.footer.includes('Services')) {
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
              footer={`Total ${vendorPlants ? vendorPlants.length : 0} Plants`}
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
            footer={`Total ${vendorProduce ? vendorProduce.length : 0} Produce`}
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
            footer={`Total ${
              vendorPackages ? vendorPackages.length : 0
            } Packages`}
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
            footer={`Total ${vendorTools ? vendorTools.length : 0} Tools`}
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
            footer={`Total ${
              vendorServices ? vendorServices.length : 0
            } Services`}
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
      </div>
    )
  )
}
export default VendorProfileInfo
