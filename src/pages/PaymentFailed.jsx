import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <div className="flex flex-col content-center items-center">
      <div className="flex failimg w-32 h-32 mt-20"></div>
      <div className="flex flex-col text-center mt-8">
        <h1 className=" text-3xl">Payment Failed</h1>
        <p className=" my-4">Oops! Looks like something went wrong</p>
        <Link to="/">
          <button className="text-sm w-48 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentFailed
