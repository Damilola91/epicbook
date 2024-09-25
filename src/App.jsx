import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavbarCustom from '../src/components/Navbar/Navbar'
import Footer from '../src/components/Footer/Footer'
import WelcomeSection from '../src/components/WelcomeSection/WelcomeSection'
import MainSection from '../src/components/MainSection/MainSection'
import Swal from 'sweetalert2'

const App = () => {
    const sweetAlert = () => {
        Swal.fire('Welcome To My Page')
    }

    return (
        <>
            <NavbarCustom />
            <WelcomeSection sweetAlert={sweetAlert} />
            <MainSection />
            <Footer />
        </>
    )
}

export default App
