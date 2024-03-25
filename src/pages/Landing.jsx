import { Button } from 'primereact/button'
import { loadStripe } from '@stripe/stripe-js'
import Client from '../services/api'

const Landing = () => {
  const cart = [
    { item: 'plant1', price: 120 },
    { item: 'plant2', price: 23 }
  ];

  const handlePurchase = async () => {
    const stripe = await loadStripe(
      'pk_test_51OxrxoIWiRBaab8WUp26UQLP1KA1MLIKzGNGjpr2z42WO2aAmlRg6JdTLLkDvI34NSXKGhCIzAgU3OvYNU76fucv00zL7j5y8l'
    );

    const payload = {
      products: cart
    };

    try {
      const response = await Client.post('/create-checkout-session', payload);
      const session = await response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>hello</h2>
      <h3>
        first page the customer lands on with our logo and login/logout links -
        maybe we dont need this
      </h3>
      <div>
        <button
          className="text-sm w-32 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
          onClick={handlePurchase}
        >
          Checkout
        </button>
      </div>
      <div className=" flex justify-center">
        <Button
          label="Submit"
          // pt={{
          //   root: { className: 'bg-teal-900' }
          // }}
        />
      </div>
    </div>
  );
};

export default Landing;
