import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    // Funzione per aggiungere un libro al carrello
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

    // Funzione per aumentare la quantità di un libro
    const incrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    // Funzione per diminuire la quantità di un libro
    const decrementQuantity = (id) => {
        setCart(
            (prevCart) =>
                prevCart
                    .map((item) =>
                        item._id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0) // Rimuove gli articoli con quantità 0
        )
    }

    // Funzione per rimuovere un libro dal carrello
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id))
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
