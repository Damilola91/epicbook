import { useContext } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderForm from '../OrderForm/OrderForm'
import { CartContext } from '../contexts/CartContext'

const stripePromise = loadStripe('pk_test_XUIpXpyaGuuw0Dc9Ng80xFWs')

const WrappedOrderForm = () => {
    const { cart } = useContext(CartContext)

    return (
        <Elements stripe={stripePromise}>
            <OrderForm cart={cart} />
        </Elements>
    )
}

export default WrappedOrderForm
