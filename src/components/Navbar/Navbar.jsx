import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { navLinks } from '../dataSource/navData'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useContext } from 'react'
import { BookContext } from '../contexts/BookContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { Link } from 'react-router-dom'
import '../Navbar/Navbar.css'

const NavbarCustom = () => {
    const { inputValue, handleInputChange, handleSubmitForm } =
        useContext(BookContext)

    const { isDarkMode, toggleThemeMode } = useContext(ThemeContext)

    return (
        <Navbar
            data-testid="nav"
            bg={isDarkMode ? 'dark' : 'light'}
            data-bs-theme={isDarkMode ? 'dark' : 'light'}
            className="d-flex justify-content-between sticky-top"
        >
            <Container>
                <Button
                    variant="info"
                    className="me-2"
                    onClick={toggleThemeMode}
                    role="button"
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Navbar.Brand>
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        EpicBook
                    </Link>
                </Navbar.Brand>
                <Nav className="me-auto">
                    {navLinks.map((link) => (
                        <Nav.Link as={Link} to={link.to} key={link.to}>
                            {link.text}
                        </Nav.Link>
                    ))}
                </Nav>

                <Form className="d-inline-flex" onSubmit={handleSubmitForm}>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search Book"
                                value={inputValue}
                                onChange={handleInputChange}
                                className="mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Navbar>
    )
}

export default NavbarCustom
