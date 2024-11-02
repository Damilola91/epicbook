import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './HomeNavigation.css'

const HomeNavigation = () => {
    const navigate = useNavigate()

    const handleGuestAccess = () => {
        navigate('/home')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <div className="navigation-container text-center">
            <div className="welcome-banner p-3 mb-4 bg-primary text-white">
                <h1>Benvenuto su EpicBooks!</h1>
                <p>
                    Scopri un mondo di libri e trova quello che ami. Inizia
                    subito come ospite, registrati o accedi al tuo account!
                </p>
            </div>
            <div className="d-flex flex-column align-items-center gap-3">
                <Button variant="primary" onClick={handleGuestAccess}>
                    Accedi come Ospite
                </Button>
                <Button variant="secondary" onClick={handleLogin}>
                    Login
                </Button>
                <Button variant="success" onClick={handleRegister}>
                    Registrati
                </Button>
            </div>
        </div>
    )
}

export default HomeNavigation
