import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BookForm = ({ onCreateBook }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        asin: '',
    })
    const [file, setFile] = useState(null)

    const handleOnChangeFiles = (e) => {
        setFile(e.target.files[0])
    }

    const handleOnChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onCreateBook(formData, file)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Titolo</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleOnChangeInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleOnChangeInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formPrice">
                <Form.Label>Prezzo</Form.Label>
                <Form.Control
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleOnChangeInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formAsin">
                <Form.Label>ASIN</Form.Label>
                <Form.Control
                    type="text"
                    name="asin"
                    value={formData.asin}
                    onChange={handleOnChangeInput}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formImg">
                <Form.Label>Immagine</Form.Label>
                <Form.Control
                    type="file"
                    name="img"
                    onChange={handleOnChangeFiles}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Crea
            </Button>
        </Form>
    )
}

export default BookForm
