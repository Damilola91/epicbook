import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importa useNavigate

const Login = ({ onLogin }) => {
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
            const result = await response.json()
            if (response.ok) {
                alert('Login effettuato con successo!')
                onLogin() // Cambia lo stato di autenticazione
                navigate('/') // Naviga alla homepage
            } else {
                alert(`Errore: ${result.message}`)
            }
        } catch (error) {
            console.error('Errore di login:', error)
            alert('Si è verificato un errore durante il login.')
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={handleInput}
                    placeholder="email"
                    name="email"
                    type="email"
                />
                <input
                    onChange={handleInput}
                    placeholder="password"
                    name="password"
                    type="password"
                />
                <button type="submit">Invia</button>
            </form>
        </>
    )
}

export default Login
