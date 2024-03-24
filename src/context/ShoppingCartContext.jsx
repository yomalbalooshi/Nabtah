import { createContext, useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  addItemToCustomerCart,
  getCustomerCartItem,
  updateCartItem,
  deleteCartItem
} from '../services/customer'
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

  async function addToCart(prodObj, prodType) {
    const quantity = getProductQuantity(prodObj._id)
    if (quantity === 0) {
      let itemToAdd = { itemId: prodObj._id, quantity: 1, itemModel: prodType }
      setCartProducts([
        ...cartProducts,
        { itemId: { ...prodObj }, quantity: 1, itemModel: prodType }
      ])
      try {
        let response = await addItemToCustomerCart(
          localStorage.getItem('_id'),
          itemToAdd
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.itemId._id === prodObj._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      )
      try {
        let cartItemToUpdate = await getCustomerCartItem({
          id: localStorage.getItem('_id'),
          itemId: prodObj._id
        })
        let updatedCartItem = await updateCartItem(
          localStorage.getItem('_id'),
          {
            itemId: cartItemToUpdate._id,
            quantity: cartItemToUpdate.quantity + 1
          }
        )
        console.log('getCustomerCartItem')
        console.log(cartItemToUpdate._id)
        console.log('updatedCartItem')
        console.log(updatedCartItem)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function removeOneFromCart(itemId) {
    const quantity = getProductQuantity(itemId)
    if (quantity == 1) {
      deleteFromCart(itemId)
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.itemId._id === itemId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      )
      let cartItemToUpdate = await getCustomerCartItem({
        id: localStorage.getItem('_id'),
        itemId: itemId
      })
      let updatedCartItem = await updateCartItem(localStorage.getItem('_id'), {
        itemId: cartItemToUpdate._id,
        quantity: cartItemToUpdate.quantity - 1
      })
    }
  }
  async function deleteFromCart(itemIdToDelete) {
    setCartProducts(
      cartProducts.filter((currentProduct) => {
        return currentProduct.itemId._id != itemIdToDelete
      })
    )
    try {
      let cartItemToUpdate = await getCustomerCartItem({
        id: localStorage.getItem('_id'),
        itemId: itemIdToDelete
      })
      let cartItemDelete = await deleteCartItem(localStorage.getItem('_id'), {
        cartItemId: cartItemToUpdate._id
      })
    } catch (error) {
      console.log(error)
    }
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
