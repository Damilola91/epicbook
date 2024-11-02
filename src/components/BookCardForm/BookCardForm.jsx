import { Card } from 'react-bootstrap'

const BookCardForm = ({ book }) => {
    return (
        <Card style={{ width: '18rem' }} className="shadow-sm">
            <Card.Img variant="top" src={book.img} alt="Book cover" />
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    <strong>Categoria:</strong> {book.category}
                </Card.Text>
                <Card.Text>
                    <strong>Prezzo:</strong> {book.price.$numberDecimal} £
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BookCardForm
