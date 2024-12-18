import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Nav, Navbar, Container } from 'react-bootstrap'
import { BookContext } from '../contexts/BookContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { UilShoppingCart, UilSignInAlt } from '@iconscout/react-unicons'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { navLinks } from '../dataSource/navData'
import Login from '../../pages/Login/Login'
import '../Navbar/Navbar.css'

const NavbarCustom = () => {
    const { inputValue, handleInputChange, handleSubmitForm } =
        useContext(BookContext)
    const { isDarkMode, toggleThemeMode } = useContext(ThemeContext)

    const [isOpen, setIsOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
        setExpanded(false)
    }

    const closeDrawer = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Navbar
                data-testid="nav"
                bg={isDarkMode ? 'dark' : 'light'}
                expand="lg"
                className="d-flex justify-content-between sticky-top"
                expanded={expanded}
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

                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {navLinks.map((link) => (
                                <Nav.Link as={Link} to={link.to} key={link.to}>
                                    {link.text}
                                </Nav.Link>
                            ))}
                        </Nav>

                        <Form
                            className="d-inline-flex"
                            onSubmit={handleSubmitForm}
                        >
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

                        <Button
                            variant="secondary"
                            onClick={toggleDrawer}
                            className="ms-3"
                        >
                            <UilSignInAlt
                                size={24}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Button>
                    </Navbar.Collapse>

                    {/* Link del carrello fuori Navbar.Collapse, visibile solo se il menu è chiuso */}
                    {!expanded && (
                        <Link to="/order" className="ms-3">
                            <UilShoppingCart
                                size={24}
                                color={isDarkMode ? 'white' : 'black'}
                            />
                        </Link>
                    )}
                </Container>
            </Navbar>

            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
                className="drawer"
                style={{ zIndex: 999 }}
                size={350}
            >
                <div className="drawer-content">
                    <Login closeDrawer={closeDrawer} />
                </div>
            </Drawer>
        </>
    )
}

export default NavbarCustom
