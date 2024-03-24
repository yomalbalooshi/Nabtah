import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <div className=" flex justify-center">
      <div className="flex flex-col text-center mt-20">
        <h1>Payment Failed</h1>
        <p>Oops! Looks like something went wrong.</p>
        <Link to="/home">
          <button className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded">
            Try again
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentFailed
