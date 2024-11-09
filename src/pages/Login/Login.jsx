import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Login.css'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
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

        // Validazione lato client
        if (!formData.email || !formData.password) {
            return Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Inserisci email e password',
            })
        }

        setIsSubmitting(true)

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

            const result = await response.json()
            if (response.ok) {
                localStorage.setItem(
                    'Authorization',
                    JSON.stringify(result.token)
                )

                // Aggiungi nome utente nel messaggio di benvenuto
                Swal.fire({
                    icon: 'success',
                    title: `Benvenuto su EpicBook, ${result.user.name}!`,
                })

                navigate('/') // Naviga alla homepage
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Errore di Login',
                    text: result.message || 'Credenziali non valide',
                })
            }
        } catch (error) {
            console.error('Errore di login:', error)
            Swal.fire({
                icon: 'error',
                title: 'Errore di rete',
                text: 'Si è verificato un errore durante il login. Riprova più tardi.',
            })
        } finally {
            setIsSubmitting(false)
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
                    value={formData.email}
                />
                <input
                    className="login-input"
                    onChange={handleInput}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                />
                <button
                    type="submit"
                    className="login-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Caricamento...' : 'Invia'}
                </button>
            </form>

            <button onClick={redirectToGoogle} className="login-button">
                Login with Google
            </button>
        </div>
    )
}

export default Login
