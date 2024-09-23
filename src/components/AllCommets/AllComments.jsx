import { Button, ListGroup, Modal } from 'react-bootstrap'
import { APIKEY } from '../../constants'
import { useEffect, useState } from 'react'

const AllComments = ({ isCommentsVisible, setIsCommentsVisible, asin }) => {
    const closeModal = () => {
        setIsCommentsVisible(false)
    }

    const ENDPOINTGET = `https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`

    const [comments, setComments] = useState([])
    console.log(comments)

    const getRatings = async () => {
        try {
            const response = await fetch(ENDPOINTGET, {
                headers: {
                    Authorization: `Bearer ${APIKEY}`,
                },
            })

            const result = await response.json()
            setComments(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRatings()
    }, [asin])

    return (
        <Modal show={isCommentsVisible}>
            <Modal.Header>
                <Modal.Title>Titolo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    {comments &&
                        comments.map((comment, index) => (
                            <ListGroup.Item key={`comment-${index}`}>
                                <div className="d-flex flex-column gap-1">
                                    <div>{comment.author}</div>
                                    <div>{comment.comment}</div>
                                    <div>{comment.rate}</div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    {comments.length <= 0 && (
                        <ListGroup.Item>
                            Non ci sono commenti per questo libro
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} variant="danger">
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AllComments
