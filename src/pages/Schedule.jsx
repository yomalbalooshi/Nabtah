import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCustomerOrders } from '../services/customer'
import React from 'react'
import { Badge, Calendar } from 'antd'
import moment from 'moment'
import { Dialog } from 'primereact/dialog'
import { MdWaterDrop } from 'react-icons/md'
import { FaToolbox } from 'react-icons/fa'
import { GiGardeningShears } from 'react-icons/gi'

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

  const getPurchasedServices = () => {
    const frequencyInDays = {
      Yearly: 365,
      Monthly: 30,
      Weekly: 7,
      Daily: 1,
      Quarterly: 90,
      Biweekly: 14,
      Bimonthly: 60,
      Semiannually: 182
    }

    return customerOrders
      ?.flatMap((order) =>
        order.orderItems.filter((item) => item.itemModel === 'Service')
      )
      .map((service) => {
        const frequency = service.itemId.frequency
        const days = frequencyInDays[frequency]
        return {
          ...service,
          itemId: {
            ...service.itemId,
            days: days
          }
        }
      })
  }

  const getPlantsToWater = (value) => {
    const purchasedPlants = getPurchasedPlants()
    const plantsToWater = []
    const uniquePlantIds = new Set()

    purchasedPlants?.forEach((plant) => {
      const wateringDates = generateWateringDates(
        plant.createdAt,
        parseInt(plant.itemId.watering)
      )

      if (
        wateringDates.includes(value?.format('YYYY-MM-DD')) &&
        !uniquePlantIds.has(plant.itemId._id)
      ) {
        plantsToWater.push(plant.itemId)
        uniquePlantIds.add(plant.itemId._id)
      }
    })
    return plantsToWater
  }
  const getServicesToPerform = (value) => {
    const purchasedServices = getPurchasedServices()
    const servicesToPerform = []

    purchasedServices?.forEach((service) => {
      const serviceDates = generateServiceDates(
        service.createdAt,
        service.itemId.days
      )
      const isWithinServiceDates = serviceDates.some((date) =>
        value?.isSame(date, 'day')
      )

      if (isWithinServiceDates) {
        servicesToPerform.push(service.itemId)
      }
    })

    return servicesToPerform
  }

  const onPanelChange = (value, mode) => {
    setSelectedDate(null)
    setVisible(null)
  }
  const onSelect = (value) => {
    setSelectedDate(value)
    setVisible(true)
  }
  const monthCellRender = (value) => {
    const num = getMonthData(value)
    return num ? <div className="notes-month"></div> : null
  }

  const generateWateringDates = (createdAt, wateringInterval) => {
    const wateringDates = []
    let currentDate = moment(createdAt)
    const nextYear = moment(createdAt).add(2, 'year')
    currentDate.add(wateringInterval, 'days')
    while (currentDate.isBefore(nextYear, 'day')) {
      wateringDates.push(currentDate.format('YYYY-MM-DD'))
      currentDate.add(wateringInterval, 'days')
    }

    return wateringDates
  }

  const generateServiceDates = (createdAt, frequencyInDays) => {
    const serviceDates = []
    let currentDate = moment(createdAt)
    const nextTwoYears = moment(createdAt).add(2, 'years')
    currentDate.add(frequencyInDays, 'days')
    while (currentDate.isBefore(nextTwoYears, 'day')) {
      serviceDates.push(currentDate.format('YYYY-MM-DD'))
      currentDate.add(frequencyInDays, 'days')
    }

    return serviceDates
  }
  const generatePruningDates = (createdAt, amount, interval) => {
    const pruningDates = []
    let currentDate = moment(createdAt)

    let intervalDays
    switch (interval) {
      case 'daily':
        intervalDays = 1
        break
      case 'weekly':
        intervalDays = 7
        break
      case 'monthly':
        intervalDays = 30
        break
      case 'yearly':
        intervalDays = 365
        break
      default:
        intervalDays = 30
    }
    intervalDays /= amount

    const twoYearsLater = moment(createdAt).add(2, 'years')

    while (currentDate.isBefore(twoYearsLater)) {
      currentDate.add(intervalDays, 'days') //change order if want to show for day purchased
      pruningDates.push(currentDate.format('YYYY-MM-DD'))
    }

    return pruningDates
  }
  const getPruningsToPerform = (value) => {
    const purchasedPlants = getPurchasedPlants()
    const pruningsToPerform = []
    const uniquePlantIds = new Set()

    purchasedPlants?.forEach((plant) => {
      const { pruningCount } = plant.itemId
      if (pruningCount && !uniquePlantIds.has(plant.itemId._id)) {
        const { amount, interval } = pruningCount
        const pruningDates = generatePruningDates(
          plant.createdAt,
          amount,
          interval
        )

        if (pruningDates.includes(value?.format('YYYY-MM-DD'))) {
          pruningsToPerform.push(plant.itemId)
        }
        uniquePlantIds.add(plant.itemId._id)
      }
    })

    return pruningsToPerform
  }

  const dateCellRender = (value) => {
    const plantsToWater = getPlantsToWater(value)
    const servicesToPerform = getServicesToPerform(value)
    const pruningsToPerform = getPruningsToPerform(value)

    if (
      plantsToWater.length > 0 ||
      servicesToPerform.length > 0 ||
      pruningsToPerform.length > 0
    ) {
      return (
        <div className="flex flex-col">
          {plantsToWater.length > 0 && (
            <Badge status="success" text={`Watering`} />
          )}
          {servicesToPerform.length > 0 && (
            <Badge status="processing" text={`Service`} />
          )}
          {pruningsToPerform.length > 0 && (
            <Badge status="warning" text={`Pruning`} />
          )}
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
        header="Schedule for the Day"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => {
          setVisible(false)
          setSelectedDate(null)
        }}
      >
        {getPlantsToWater(selectedDate)?.map((plant, index) => (
          <div key={index} className="flex">
            <MdWaterDrop style={{ marginRight: '8px' }} />
            <p className="text-sky-700"> Water {plant.name}</p>
          </div>
        ))}
        {getServicesToPerform(selectedDate)?.map((service, index) => (
          <div key={`service_${index}`} className="flex">
            <FaToolbox style={{ marginRight: '8px', marginTop: '3px' }} />
            <p className="text-teal-700">{service.name} Scheduled</p>
          </div>
        ))}
        {getPruningsToPerform(selectedDate)?.map((plant, index) => (
          <div key={`plant${index}`} className="flex">
            <GiGardeningShears
              style={{ marginRight: '8px', marginTop: '3px' }}
            />
            <p className="text-yellow-600"> Prune {plant.name} </p>
          </div>
        ))}
      </Dialog>
    </div>
  )
}

export default Schedule
