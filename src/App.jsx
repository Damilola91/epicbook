import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavbarCustom from './components/Navbar/Navbar'
import WelcomeSection from './components/WelcomeSection/WelcomeSection'
import MainSection from './components/MainSection/MainSection'
import Footer from './components/Footer/Footer'
import Swal from 'sweetalert2'


const App = () => {

    const notifica = () => {
        Swal.fire("Welcome To My Page")
    }


    return (
        <>
            <NavbarCustom />

            <WelcomeSection 
                notifica={notifica}
            />

            <MainSection />

            <Footer />
        </>
    )
}

export default App
