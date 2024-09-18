import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { navLinks } from '../dataSource/navData'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useState } from 'react'
import MainSection from '../MainSection/MainSection'
import fantasy from '../dataSource/books/fantasy.json'
import history from '../dataSource/books/history.json'
import romance from '../dataSource/books/romance.json'
import horror from '../dataSource/books/horror.json'
import scifi from '../dataSource/books/scifi.json'
import Swal from 'sweetalert2'
import WelcomeSection from "../WelcomeSection/WelcomeSection"

const NavbarCustom = () => {
    // Gestione dello stato dei libri qui
    const allBooks = [...fantasy, ...history, ...romance, ...horror, ...scifi]
    const randomBooks = allBooks.sort(() => Math.random() - 0.5)
    const [books, setBooks] = useState(randomBooks)
    const [totalBooks] = useState(randomBooks)
    const [inputValue, setInputValue] = useState("")

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const filteredBook = () => {
        if (inputValue === "") {
            setBooks(totalBooks)  // Ripristina tutti i libri
        } else {
            const filterBook = totalBooks.filter((book) => 
                book.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            setBooks(filterBook)  // Filtra i libri
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        filteredBook()
    }

    const notifica = () => {
        Swal.fire('Welcome To My Page')
    }

    return (
        <>
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

           <WelcomeSection notifica={notifica}/>

           
            <MainSection books={books} />
        </>
    )
}

export default NavbarCustom