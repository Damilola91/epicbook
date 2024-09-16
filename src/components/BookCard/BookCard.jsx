import { Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './BookCard.css'

const BookCard = ({ price, category, title, img }) => {
    return (
        <Col sm={12} md={4} lg={3}>
            <Card className="h-100 custom">
                <Card.Img
                    variant="top"
                    className="h-100 w-100 object-fit-cover"
                    src={img}
                />
                <Card.Body>
                    <Card.Title>{category}</Card.Title>
                    <Card.Text className="text-truncate">{title}</Card.Text>

                    <Card.Text>{price}£</Card.Text>
                    <div className='d-flex justify-content-between'>
                    <Button variant="primary">Acquista</Button>
                    <Button variant="warning">Dettagli</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookCard
