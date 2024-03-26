import { RiPlantFill } from 'react-icons/ri'
import { FaTools } from 'react-icons/fa'
import { MdOutlineRoomService } from 'react-icons/md'
import { GiFruitBowl } from 'react-icons/gi'

const PackageCard = ({ pack }) => {
  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          {pack.name}
        </h3>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {pack.description}
        </p>
        <div className="mt-10 flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
            What's included
          </h4>
          <div className="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
        >
          {pack?.plants?.length > 0 && (
            <div>
              <li className="flex items-center gap-x-3">
                <RiPlantFill />
                <ul>
                  {pack.plants.map((plant) => (
                    <li key={plant._id}>{plant.name}</li>
                  ))}
                </ul>
              </li>
            </div>
          )}
          {pack.services.length > 0 && (
            <div>
              <li className="flex items-center gap-x-3">
                <MdOutlineRoomService className="text-xl" />

                <ul>
                  {pack.services.map((service) => (
                    <li key={service._id}>{service.name}</li>
                  ))}
                </ul>
              </li>
            </div>
          )}

          {pack.tools.length > 0 && (
            <div>
              <li className="flex items-center gap-x-3">
                <FaTools />

                <ul>
                  {pack.tools.map((tool) => (
                    <li key={tool._id}>{tool.name}</li>
                  ))}
                </ul>
              </li>
            </div>
          )}

          {pack.produce.length > 0 && (
            <div>
              <li className="flex items-center gap-x-3">
                <GiFruitBowl />

                <ul>
                  {pack.produce.map((prod) => (
                    <li key={prod._id}>{prod.name}</li>
                  ))}
                </ul>
              </li>
            </div>
          )}
        </ul>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">Total Price</p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {pack.price}
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                BHD
              </span>
            </p>
            <a
              href="#"
              className="mt-10 block w-full rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800"
            >
              Purchase
            </a>
            <p className="mt-6 text-xs leading-5 text-gray-600">
              Invoices and receipts available for easy company reimbursement
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageCard
