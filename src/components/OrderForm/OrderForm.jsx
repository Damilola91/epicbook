import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import styles from './OrderForm.module.css'
import useSession from '../../hooks/useSession'

const OrderForm = () => {
    const { cart } = useContext(CartContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderMessage, setOrderMessage] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    const session = useSession()

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
                            <h4 className={styles.cartItemTitle}>
                                {item.title}
                            </h4>
                            <p>
                                Prezzo unitario: €
                                {parseFloat(item.price).toFixed(2)}
                            </p>
                            <p>Quantità: {item.quantity}</p>
                            <p>
                                Prezzo totale: €
                                {(
                                    parseFloat(item.price) * item.quantity
                                ).toFixed(2)}
                            </p>
                        </div>
                    ))}
                    <div className={styles.paymentSection}>
                        <h3>Pagamento</h3>
                        <CardElement className={styles.cardElement} />
                    </div>

                    <button
                        onClick={handleSubmitOrder}
                        disabled={isSubmitting}
                        className={styles.button}
                    >
                        {isSubmitting ? 'Inviando...' : 'Invia Ordine'}
                    </button>
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
