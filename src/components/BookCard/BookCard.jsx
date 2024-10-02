import { Button, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import './BookCard.css'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { CommentSelectedCard } from '../contexts/CommentSelectedCard'
import { useNavigate } from 'react-router-dom'

const BookCard = ({ price, category, title, img, asin }) => {
    const { selectedCardAsin, toggleIsSelect } = useContext(CommentSelectedCard)
    const { isDarkMode } = useContext(ThemeContext)
    const navigate = useNavigate()

    const handleRedirectDetails = () => {
        navigate(`/book/${asin}`)
    }

    const isSelected = selectedCardAsin === asin
    const selectedCardStyle = isSelected ? 'border-5 border-danger' : ''

    return (
        <Col sm={12} md={6} lg={4}>
            <Card
                className={`h-100 custom ${isDarkMode ? 'border-3 white' : ''} ${selectedCardStyle}`}
                onClick={() => toggleIsSelect(asin)}
            >
                <Card.Img
                    variant="top"
                    className="h-75 w-100 object-fit-cover custom-img"
                    src={img}
                />
                <Card.Body
                    className={` custom-body ${
                        isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
                    }`}
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
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookCard
