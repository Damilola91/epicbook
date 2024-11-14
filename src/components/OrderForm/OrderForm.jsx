import { useState, useContext } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CartContext } from '../contexts/CartContext'
import styles from './OrderForm.module.css'
import useSession from '../../hooks/useSession'
import { UilTrash } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'

const OrderForm = () => {
    const {
        cart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
    } = useContext(CartContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderMessage, setOrderMessage] = useState('')
    const [isConfirmed, setIsConfirmed] = useState(false)

    const stripe = useStripe()
    const elements = useElements()
    const session = useSession()
    const navigate = useNavigate()

    const cartTotal = cart
        .reduce(
            (total, item) => total + parseFloat(item.price) * item.quantity,
            0
        )
        .toFixed(2)

    const handleConfirmOrder = () => {
        setIsConfirmed(true)
    }

    const handleSubmitOrder = async () => {
        if (!stripe || !elements) return
        setIsSubmitting(true)
        setOrderMessage('')

        const orderData = {
            userId: session._id,
            items: cart.map((item) => ({
                book: item._id,
                quantity: item.quantity,
                price: (parseFloat(item.price) * item.quantity).toFixed(2),
            })),
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/orders`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                }
            )

            const { clientSecret } = await response.json()

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })

            if (result.error) {
                setOrderMessage(`Errore nel pagamento: ${result.error.message}`)
            } else if (result.paymentIntent.status === 'succeeded') {
                setOrderMessage(
                    'Ordine creato e pagamento effettuato con successo!'
                )

                // Svuotiamo il carrello
                clearCart()

                // Dopo un ritardo di 2 secondi, reindirizziamo l'utente
                setTimeout(() => {
                    navigate('/') // Reindirizza alla home page
                }, 2000) // Ritardo di 2 secondi
            }
        } catch (error) {
            console.error("Errore nell'invio dell'ordine:", error)
            setOrderMessage(
                "Si è verificato un errore durante la creazione dell'ordine."
            )
        }

        setIsSubmitting(false)
    }

    return (
        <div className={styles.orderFormBody}>
            <h1 className={styles.title}>Carrello</h1>

            {cart.length > 0 ? (
                <>
                    <h2 className={styles.cartTitle}>Carrello</h2>
                    {cart.map((item) => (
                        <div key={item._id} className={styles.cartItem}>
                            <div className={styles.cartItemDetails}>
                                <h4 className={styles.cartItemTitle}>
                                    {item.title}
                                </h4>
                                <p>
                                    Prezzo unitario: €
                                    {parseFloat(item.price).toFixed(2)}
                                </p>
                                <div className={styles.quantityControls}>
                                    <button
                                        onClick={() =>
                                            decrementQuantity(item._id)
                                        }
                                        disabled={item.quantity <= 1}
                                        className={styles.decrementButton}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            incrementQuantity(item._id)
                                        }
                                        className={styles.incrementButton}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>
                                    Prezzo totale: €
                                    {(
                                        parseFloat(item.price) * item.quantity
                                    ).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className={styles.removeButton}
                                    aria-label="Rimuovi elemento"
                                >
                                    <UilTrash size="24" color="#ff4d4f" />
                                </button>
                            </div>
                            <img
                                src={item.img}
                                alt={item.title}
                                className={styles.cartItemImage}
                            />
                        </div>
                    ))}
                    <div className={styles.paymentSection}>
                        <h3>Totale carrello: €{cartTotal}</h3>
                    </div>

                    {!isConfirmed ? (
                        <button
                            onClick={handleConfirmOrder}
                            className={styles.button}
                        >
                            Acquista (€{cartTotal})
                        </button>
                    ) : (
                        <>
                            <h3>Pagamento</h3>
                            <CardElement className={styles.cardElement} />
                            <button
                                onClick={handleSubmitOrder}
                                disabled={isSubmitting}
                                className={styles.button}
                            >
                                {isSubmitting ? 'Inviando...' : 'Pagamento'}
                            </button>
                        </>
                    )}
                </>
            ) : (
                <p>Il carrello è vuoto!</p>
            )}

            {orderMessage && (
                <p className={styles.statusMessage}>{orderMessage}</p>
            )}
        </div>
    )
}

export default OrderForm
