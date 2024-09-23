import { Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './BookCard.css'
import { useState } from 'react'
import RatingArea from '../RatingArea/RatingArea'
import AllComments from '../AllCommets/AllComments'
import EditComment from '../EditComment/EditComment'

const BookCard = ({ price, category, title, img, asin }) => {
    const [isSelected, setIsSelected] = useState(false)
    const [showCommentArea, setShowCommentArea] = useState(false)
    const [isCommentsVisible, setIsCommentsVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const toggleShowCommentArea = () => setShowCommentArea(!showCommentArea)

    const toggleIsSelect = () => {
        setIsSelected(!isSelected)
    }

    const openCommentsModal = () => {
        setIsCommentsVisible(true)
    }

    const openEditCommentModal = () => {
        setIsModalVisible(true)
    }

    const toggleHideCommentArea = () => {
        setShowCommentArea(false)
    }

    const selectedCardStyle = isSelected ? 'border-5 border-danger' : ''

    console.log(isSelected)

    return (
        <>
            <Col sm={12} md={4} lg={3}>
                <Card
                    className={`h-100 custom ${selectedCardStyle}`}
                    onClick={toggleIsSelect}
                >
                    <Card.Img
                        variant="top"
                        className="h-100 w-100 object-fit-cover"
                        src={img}
                    />
                    <Card.Body>
                        <Card.Title>{category}</Card.Title>
                        <Card.Text className="text-truncate">{title}</Card.Text>

                        <Card.Text>{price}£</Card.Text>
                        <div className="d-flex justify-content-between">
                            <Button
                                onClick={openCommentsModal}
                                variant="primary"
                            >
                                Commenti
                            </Button>
                            <Button
                                onClick={toggleShowCommentArea}
                                variant="warning text-white"
                            >
                                Aggiungi Commento
                            </Button>
                        </div>
                        {showCommentArea && (
                            <RatingArea
                                asin={asin}
                                onHide={toggleHideCommentArea}
                                onEditComment={openEditCommentModal}
                            />
                        )}
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

            {isModalVisible && (
                <EditComment
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    asin={asin}
                />
            )}
        </>
    )
}

export default BookCard
