import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (book) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === book._id)
            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === book._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { ...book, quantity: 1 }]
            }
        })
    }

    const incrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    const decrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item._id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
