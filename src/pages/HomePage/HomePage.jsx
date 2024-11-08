import NavbarCustom from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection'
import MainSection from '../../components/MainSection/MainSection'
import Swal from 'sweetalert2'

const HomePage = () => {
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

export default HomePage
