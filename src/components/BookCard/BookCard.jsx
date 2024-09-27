import { Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './BookCard.css'
import { useContext, useState } from 'react'
import AllComments from '../AllCommets/AllComments'
import { ThemeContext } from '../contexts/ThemeContext'

const BookCard = ({ price, category, title, img, asin }) => {
    const [isSelected, setIsSelected] = useState(false)
    const [isCommentsVisible, setIsCommentsVisible] = useState(false)
    const { isDarkMode } = useContext(ThemeContext)

    const toggleIsSelect = () => {
        setIsSelected(!isSelected)
    }

    const openCommentsModal = () => {
        setIsCommentsVisible(true)
    }

    const selectedCardStyle = isSelected ? 'border-5 border-danger' : ''

    return (
        <>
            <Col sm={12} md={4} lg={3}>
                <Card
                    className={`h-100 custom ${isDarkMode ? 'border-3 white' : ''} ${selectedCardStyle}`}
                    onClick={toggleIsSelect}
                >
                    <Card.Img
                        variant="top"
                        className="h-75 w-100 object-fit-cover custom-img"
                        src={img}
                    />
                    <Card.Body
                        className={` custom-body ${
                            isDarkMode
                                ? 'bg-dark text-light'
                                : 'bg-light text-dark'
                        }`}
                    >
                        <Card.Title className="custom-title">
                            {category}
                        </Card.Title>
                        <Card.Text className="text-truncate custom-text">
                            {title}
                        </Card.Text>
                        <Card.Text>{price}£</Card.Text>
                        <div className="d-flex justify-content-between">
                            <Button
                                onClick={openCommentsModal}
                                variant="primary"
                                className="custom-button"
                            >
                                Commenti
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {isCommentsVisible && (
                <AllComments
                    isCommentsVisible={isCommentsVisible}
                    setIsCommentsVisible={setIsCommentsVisible}
                    asin={asin}
                />
            )}
        </>
    )
}

export default BookCard
