import { Card } from 'react-bootstrap'
import '../../pages/BookOfTheDay/BookOfTheDay.css'

const BookCardForm = ({ book }) => {
    return (
        <div className="book-card-preview">
            <Card style={{ width: '18rem' }} className="shadow-sm">
                <Card.Img
                    variant="top"
                    src={book.img}
                    alt="Book cover"
                    className="card-img"
                />
                <Card.Body>
                    <Card.Title className="card-title">{book.title}</Card.Title>
                    <Card.Text className="card-text">
                        <strong>Categoria:</strong> {book.category}
                    </Card.Text>
                    <Card.Text className="card-text">
                        <strong>Prezzo:</strong> {book.price.$numberDecimal} £
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BookCardForm
