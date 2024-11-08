import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { isAuth } from '../middlewares/ProtectedRoutes'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../utilis/verifyTokenExpiration'

const useSession = () => {
    const session = isAuth()
    const decodedSession = session ? jwtDecode(session) : null

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    useEffect(() => {
        if (
            !session ||
            isTokenExpired(decodedSession.exp, () => navigate('/'))
        ) {
            navigateToHome()
        }
    }, [navigate, session])
    return decodedSession
}

export default useSession
