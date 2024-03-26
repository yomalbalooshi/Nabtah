import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCustomerOrders } from '../services/customer'
import React from 'react'
import { Badge, Calendar } from 'antd'
import moment from 'moment'
import { Dialog } from 'primereact/dialog'

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394
  }
}

const Schedule = () => {
  let { id } = useParams()
  const [customerOrders, setCustomerOrders] = useState()
  const [selectedDate, setSelectedDate] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const getOrders = async () => {
      const data = await getCustomerOrders(id)
      setCustomerOrders(data)
    }
    getOrders()
  }, [])

  const getPurchasedPlants = () => {
    return customerOrders?.flatMap((order) =>
      order.orderItems.filter((item) => item.itemModel === 'Plant')
    )
  }

  const getPlantsToWater = (value) => {
    const purchasedPlants = getPurchasedPlants()
    const plantsToWater = []

    purchasedPlants?.forEach((plant) => {
      const wateringDates = generateWateringDates(
        plant.createdAt,
        parseInt(plant.itemId.watering)
      )

      if (wateringDates.includes(value?.format('YYYY-MM-DD'))) {
        plantsToWater.push(plant.itemId)
      }
    })

    return plantsToWater
  }

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
    console.log(value)
  }
  const onSelect = (value) => {
    // console.log(value.format('YYYY-MM-DD'))

    setSelectedDate(value)
    setVisible(true)
    console.log('selecteddate', selectedDate)
  }
  const monthCellRender = (value) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const generateWateringDates = (createdAt, wateringInterval) => {
    const wateringDates = []
    let currentDate = moment(createdAt)
    const nextYear = moment(createdAt).add(1, 'year')

    while (currentDate.isBefore(nextYear, 'day')) {
      wateringDates.push(currentDate.format('YYYY-MM-DD'))
      currentDate.add(wateringInterval, 'days')
    }

    return wateringDates
  }

  // const dateCellRender = (value) => {
  //   const purchasedPlants = getPurchasedPlants()
  //   return (
  //     <ul className="events">
  //       {purchasedPlants?.map((plant) => {
  //         const wateringDates = generateWateringDates(
  //           plant.createdAt,
  //           parseInt(plant.itemId.watering)
  //         )
  //         if (wateringDates.includes(value.format('YYYY-MM-DD'))) {
  //           return (
  //             <li>
  //               <Badge status="success" text={`Water ${plant.itemId.name}`} />
  //             </li>
  //           )
  //         }
  //         return null
  //       })}
  //     </ul>
  //   )
  // }
  // const dateCellRender = (value) => {
  //   const purchasedPlants = getPurchasedPlants()
  //   const plantsToWater = []

  //   purchasedPlants?.forEach((plant) => {
  //     const wateringDates = generateWateringDates(
  //       plant.createdAt,
  //       parseInt(plant.itemId.watering)
  //     )

  //     if (wateringDates.includes(value.format('YYYY-MM-DD'))) {
  //       plantsToWater.push(plant.itemId)
  //     }
  //   })
  //   if (plantsToWater.length > 0) {
  //     return (
  //       <div>
  //         <Badge status="success" text={`Watering`} />
  //         {/* {selectedDate && selectedDate.isSame(value, 'day') && visible && (

  //           <Dialog
  //             header="Plants to Water"
  //             visible={visible}
  //             style={{ width: '50vw' }}
  //             // onHide={() => setVisible(false)}
  //           >
  //             {plantsToWater.map((plant, index) => (
  //               <div>
  //                 <p key={index}>{plant.name}</p>
  //               </div>
  //             ))}
  //             <button
  //               onClick={() => {
  //                 setVisible(false)
  //                 setSelectedDate(null)
  //               }}
  //             >
  //               hide
  //             </button>
  //           </Dialog>
  //         )} */}
  //       </div>
  //     )
  //   }

  //   return null
  // }

  const dateCellRender = (value) => {
    const plantsToWater = getPlantsToWater(value)

    if (plantsToWater.length > 0) {
      return (
        <div>
          <Badge status="success" text={`Watering`} />
        </div>
      )
    }

    return null
  }
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }

  return (
    <div>
      <Calendar
        cellRender={cellRender}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
      />
      <Dialog
        header="Plants to Water"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => {
          setVisible(false)
          setSelectedDate(null)
        }}
      >
        {getPlantsToWater(selectedDate)?.map((plant, index) => (
          <div key={index}>
            <p>{plant.name}</p>
          </div>
        ))}
      </Dialog>
    </div>
  )
}

export default Schedule
