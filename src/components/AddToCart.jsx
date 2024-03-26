import { Dialog } from 'primereact/dialog'
import { useState, useContext } from 'react'
import { Button } from 'primereact/button'
import { ShoppingCartContext } from '../context/ShoppingCartContext'
import { FaShoppingCart } from 'react-icons/fa'

const AddToCart = ({ product, productType }) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState('center')
  const [addtoCartModalTitle, setaddtoCartModalTitle] = useState('')
  const [addtoCartModalItemPrice, setaddtoCartModalItemPrice] = useState(0)
  const cart = useContext(ShoppingCartContext)
  const productQuantity = cart.getProductQuantity(product._id)
  const footerContent =
    productQuantity === 0 ? (
      <div>
        <Button
          label="Add"
          onClick={() => {
            // setVisible(false)
            cart.addToCart(product, productType)
            console.log(cart.getProductQuantity(product._id))
          }}
          autoFocus
          className=" bg-green-600 hover:bg-green-700  "
        />
        <Button
          label="Cancel"
          onClick={() => setVisible(false)}
          className="p-button-text text-green-600"
        />
      </div>
    ) : (
      <div className=" flex justify-between ">
        <p className=" text-xl">In Cart: {productQuantity}</p>
        <section>
          <Button
            onClick={() => cart.addToCart(product)}
            className=" bg-green-600 hover:bg-green-700  "
          >
            +
          </Button>
          <Button
            onClick={() => cart.removeOneFromCart(product._id)}
            className=" bg-red-600 hover:bg-red-700  "
          >
            -
          </Button>
          <Button
            onClick={() => cart.deleteFromCart(product._id)}
            className="bg-red-900 hover:bg-red-950  "
          >
            X
          </Button>
        </section>
      </div>
    )
  const showAddtoCartModal = (position, name, price) => {
    setaddtoCartModalTitle(name)
    setaddtoCartModalItemPrice(price)
    setPosition(position)
    setVisible(true)
  }
  return (
    <div>
      <Button
        className="w-10 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded flex justify-center align-middle"
        onClick={() =>
          showAddtoCartModal('bottom', product.name, product.price)
        }
      >
        <FaShoppingCart />
      </Button>
      <Dialog
        header={`Add ${addtoCartModalTitle} to Cart!`}
        visible={visible}
        position={position}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <p className="m-0">Price: {addtoCartModalItemPrice}</p>
      </Dialog>
    </div>
  )
}
export default AddToCart
