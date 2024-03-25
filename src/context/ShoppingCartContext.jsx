import { createContext, useState, useEffect } from 'react'
import { getCustomerCart } from '../services/customer'
import { useAuth0 } from '@auth0/auth0-react'

export const ShoppingCartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  setCartFromDb: () => {},
  addToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getProductsCount: () => {}
})

export function ShoppingCartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([])

  function setCartFromDb(cartItems) {
    setCartProducts(cartItems)
    console.log(cartItems)
  }
  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.itemId._id === id
    )?.quantity
    if (quantity === undefined) {
      return 0
    }
    return quantity
  }

  function addToCart(prodObj, prodType) {
    const quantity = getProductQuantity(prodObj._id)
    console.log(quantity)
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        { itemId: { ...prodObj }, quantity: 1, itemModel: prodType }
      ])
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.itemId._id === prodObj._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      )
    }
  }
  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id)
    if (quantity == 1) {
      deleteFromCart(id)
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.itemId._id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      )
    }
  }
  function deleteFromCart(id) {
    setCartProducts(
      cartProducts.filter((currentProduct) => {
        return currentProduct.itemId._id != id
      })
    )
  }
  function getProductsCount() {
    let totalQuantity = cartProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    )
    return totalQuantity
  }

  const contextValue = {
    items: [],
    getProductQuantity,
    addToCart,
    removeOneFromCart,
    deleteFromCart,
    getProductsCount,
    setCartFromDb
    // getTotalCost
  }

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
export default ShoppingCartProvider
