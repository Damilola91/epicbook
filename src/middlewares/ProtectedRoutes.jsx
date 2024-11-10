import HomePage from '../pages/HomePage/HomePage'

import { Outlet } from 'react-router-dom'

//ci prendiamo nella funzione isAuth il TOKEN dal localStorage salvato dalla nostra Login andata a buon fine
export const isAuth = () => {
    return JSON.parse(localStorage.getItem('Authorization'))
}

const ProtectedRoutes = () => {
    const isAuthorized = isAuth()

    return isAuthorized ? <Outlet /> : <HomePage />
}
export default ProtectedRoutes
