import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessLoginPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get('token')
        console.log('Token ricevuto:', token) // Per verificare il token

        if (token) {
            localStorage.setItem('auth', JSON.stringify(token))
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [location, navigate])

    return (
        <div>
            <h1>Login Effettuato Con Successo</h1>
        </div>
    )
}

export default SuccessLoginPage
