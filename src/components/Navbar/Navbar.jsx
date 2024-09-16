import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { navLinks } from '../dataSource/navData'

const NavbarCustom = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        {navLinks.map((link) => (
                            <Nav.Link href={link.href}>{link.text}</Nav.Link>
                        ))}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarCustom
