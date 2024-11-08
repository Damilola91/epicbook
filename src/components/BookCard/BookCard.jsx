import { Button, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import './BookCard.css'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { CommentSelectedCard } from '../contexts/CommentSelectedCard'
import { CartContext } from '../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

const BookCard = ({ price, category, title, img, asin, _id }) => {
    const { selectedCardAsin, toggleIsSelect } = useContext(CommentSelectedCard)
    const { isDarkMode } = useContext(ThemeContext)
    const { addToCart } = useContext(CartContext)
    const navigate = useNavigate()

    const handleRedirectDetails = () => {
        navigate(`/book/${_id}?title=${title}&test=true`)
    }

    const handleAddToCart = () => {
        addToCart({ price, category, title, img, asin, _id })
    }

    const isSelected = selectedCardAsin === _id
    const selectedCardStyle = isSelected ? 'border-5 border-danger' : ''

    return (
        <Col sm={12} md={6} lg={2}>
            <Card
                className={`h-100 custom ${isDarkMode ? 'border-3 white' : ''} ${selectedCardStyle}`}
                onClick={() => toggleIsSelect(_id)}
            >
                <Card.Img
                    variant="top"
                    className="h-75 w-100 object-fit-cover custom-img"
                    src={img}
                    role="img"
                    alt="imagine"
                />
                <Card.Body
                    className={`custom-body ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
                    data-testid="book-card"
                >
                    <Card.Title className="custom-title">{category}</Card.Title>
                    <Card.Text className="text-truncate custom-text">
                        {title}
                    </Card.Text>
                    <Card.Text>{price}£</Card.Text>
                    <Button
                        onClick={handleRedirectDetails}
                        className="custom-button btn"
                    >
                        Details
                    </Button>
                    <Button onClick={handleAddToCart}>Cart</Button>{' '}
                    {/* Modifica il click handler */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookCard
