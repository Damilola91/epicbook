// BookOfTheDay.js
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarCustom from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import BookForm from '../../components/BookForm/BookForm'
import BookCardForm from '../../components/BookCardForm/BookCardForm'

const BookOfTheDay = () => {
    const [book, setBook] = useState(null)

    const uploadFile = async (fileToUpload) => {
        const fileData = new FormData()
        fileData.append('img', fileToUpload)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/books/upload/cloud`,
                {
                    method: 'POST',
                    body: fileData,
                }
            )
            const data = await response.json()
            return data.img
        } catch (error) {
            console.error(
                "Errore durante l'upload dell'immagine:",
                error.message
            )
        }
    }

    const createBook = async (formData, file) => {
        if (file) {
            try {
                const uploadedImageUrl = await uploadFile(file)

                const postFormData = {
                    ...formData,
                    img: uploadedImageUrl,
                }

                const response = await fetch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/books/create`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(postFormData),
                    }
                )
                const createdBook = await response.json()
                setBook(createdBook.book)
            } catch (error) {
                console.log(
                    'Errore durante la creazione del libro:',
                    error.message
                )
            }
        } else {
            console.log('Nessun file selezionato.')
        }
    }

    return (
        <>
            <NavbarCustom />
            <Container className="py-4">
                <Row>
                    <Col md={6} className="mb-4">
                        <h2>Crea un libro</h2>
                        <BookForm onCreateBook={createBook} />
                    </Col>

                    <Col
                        md={6}
                        className="d-flex align-items-center justify-content-center"
                    >
                        {book && <BookCardForm book={book} />}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default BookOfTheDay
