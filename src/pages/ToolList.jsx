import { Card } from 'primereact/card'
import { useState, useEffect } from 'react'
import { getAllTools } from '../services/tool'
import { Paginator } from 'primereact/paginator'
import '../styles/vendorList.css'

const VendorList = () => {
  const [tools, setTools] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)

  useEffect(() => {
    const getToolDetails = async () => {
      let response = await getAllTools()
      setTools(response)
    }
    getToolDetails()
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  return (
    <div>
      <h2 className="text-center text-3xl mt-8">Tools</h2>
      <div className="flex flex-wrap justify-around text-center">
        {tools.slice(first, first + rows).map((tool) => (
          <Card
            key={tool._id}
            className="my-6 shadow-lg transition-transform duration-400 transform hover:scale-105 rounded-lg"
          >
            <div className="flex flex-col">
              <img
                className="rounded-t-lg w-96 h-56 object-cover"
                src={tool.image}
                alt={tool.name}
              />
              <h2 className="text-2xl pt-4">{tool.name}</h2>
            </div>
          </Card>
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={tools.length}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default VendorList
