import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Login.css'

const Login = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleInput = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            if (response.ok) {
                const result = await response.json()
                localStorage.setItem(
                    'Authorization',
                    JSON.stringify(result.token)
                )

                Swal.fire('Welcome To EpicBook')

                navigate('/') // Naviga alla homepage
            } else {
                alert(`Errore: ${result.message}`)
            }
        } catch (error) {
            console.error('Errore di login:', error)
            alert('Si è verificato un errore durante il login.')
        }
    }

    const redirectToGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }

    return (
        <div className="login-container">
            <h1 className="login-title">EpicBook</h1>
            <form onSubmit={onSubmit} className="login-form">
                <input
                    className="login-input"
                    onChange={handleInput}
                    placeholder="Email"
                    name="email"
                    type="email"
                />
                <input
                    className="login-input"
                    onChange={handleInput}
                    placeholder="Password"
                    name="password"
                    type="password"
                />
                <button type="submit" className="login-button">
                    Invia
                </button>
            </form>

            <button onClick={redirectToGoogle} className="login-button">
                Login with Google
            </button>
        </div>
    )
}

export default Login
