import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { navLinks } from '../dataSource/navData'
import { Button, Col, Form, Row } from 'react-bootstrap'

const NavbarCustom = ({ inputValue, onChangeInput, handleSubmitForm }) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" className="d-flex justify-content-between">
            <Container>
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    {navLinks.map((link) => (
                        <Nav.Link href={link.href} key={link.href}>{link.text}</Nav.Link>
                    ))}
                </Nav>

                <Form className="d-inline-flex" onSubmit={handleSubmitForm}>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search Book"
                                value={inputValue}
                                onChange={onChangeInput}
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