import { Button, ListGroup, Form } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { ThemeContext } from '../contexts/ThemeContext'
import useSession from '../../hooks/useSession'

const AllComments = ({ _id }) => {
    const { isDarkMode } = useContext(ThemeContext)
    const userSession = useSession()

    const ENDPOINTGET = `${import.meta.env.VITE_SERVER_BASE_URL}/comments/book/${_id}`
    const [comments, setComments] = useState([])
    const [modalFormState, setModalFormState] = useState({
        rate: '',
        comment: '',
        id: null,
        book: _id,
        user: userSession._id,
    })

    const handleInputChange = (e) => {
        const parseRate =
            e.target.name === 'rate' ? Number(e.target.value) : e.target.value
        setModalFormState({
            ...modalFormState,
            [e.target.name]: parseRate,
        })
    }

    const getRatings = async () => {
        if (!_id) return
        try {
            const response = await fetch(ENDPOINTGET)
            if (response.ok) {
                const result = await response.json()
                setComments(result.comments)
            } else {
                console.log('Error fetching comments:', response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRatings()
    }, [_id])

    const addOrUpdateComment = async (e) => {
        e.preventDefault()

        const endpoint = modalFormState.id
            ? `${import.meta.env.VITE_SERVER_BASE_URL}/comments/update/${modalFormState.id}`
            : `${import.meta.env.VITE_SERVER_BASE_URL}/comments/create`

        const method = modalFormState.id ? 'PATCH' : 'POST'

        const result = await Swal.fire({
            title: modalFormState.id
                ? 'Do you want to edit this comment?'
                : 'Do you want to add this comment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        })

        if (result.isConfirmed) {
            try {
                console.log('Payload inviato:', {
                    rate: modalFormState.rate,
                    comment: modalFormState.comment,
                    book: modalFormState.book,
                    user: modalFormState.user,
                })

                const response = await fetch(endpoint, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rate: modalFormState.rate,
                        comment: modalFormState.comment,
                        book: modalFormState.book,
                        user: modalFormState.user,
                    }),
                })

                if (response.ok) {
                    Swal.fire('Saved!', '', 'success')
                    setModalFormState({
                        rate: '',
                        comment: '',
                        id: null,
                        book: _id,
                        user: userSession._id,
                    })
                    getRatings()
                } else {
                    Swal.fire('Error!', 'Something went wrong.', 'error')
                }
            } catch (error) {
                console.error('Errore durante il fetch:', error)
                Swal.fire('Error!', 'Something went wrong.', 'error')
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    }

    const handleEditClick = (comment) => {
        setModalFormState({
            rate: comment.rate,
            comment: comment.comment,
            id: comment._id,
            book: comment.book,
            user: comment.user,
        })
    }

    const deleteComment = async (commentId) => {
        const endpoint = `${import.meta.env.VITE_SERVER_BASE_URL}/comments/delete/${commentId}`

        const result = await Swal.fire({
            title: 'Do you want to delete this comment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(endpoint, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    Swal.fire('Deleted!', '', 'success')
                    getRatings()
                } else {
                    Swal.fire('Error!', 'Unable to delete comment.', 'error')
                }
            } catch (error) {
                console.error(error)
                Swal.fire('Error!', 'Something went wrong.', 'error')
            }
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    }

    return (
        <div className={isDarkMode ? 'bg-dark' : 'bg-light'}>
            <ListGroup variant="flush">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <ListGroup.Item key={comment._id}>
                            <div className="d-flex flex-column gap-1">
                                <div>
                                    <strong>Author:</strong>{' '}
                                    {comment.user
                                        ? comment.user.name
                                        : 'Not Available'}
                                </div>
                                <div>
                                    <strong>Comment:</strong> {comment.comment}
                                </div>
                                <div>
                                    <strong>Rating:</strong> {comment.rate}
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="warning"
                                    onClick={() => handleEditClick(comment)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => deleteComment(comment._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>
                        Non ci sono commenti per questo libro
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Form onSubmit={addOrUpdateComment}>
                <Form.Control
                    type="number"
                    min={1}
                    max={5}
                    required={true}
                    name="rate"
                    value={modalFormState.rate}
                    onChange={handleInputChange}
                    placeholder="Rate"
                />
                <Form.Control
                    type="text"
                    required={true}
                    name="comment"
                    value={modalFormState.comment}
                    onChange={handleInputChange}
                    placeholder="Comment"
                />
                <Button type="submit" variant="success" className="mt-2">
                    {modalFormState.id ? 'Aggiorna Commento' : 'Invia Commento'}
                </Button>
            </Form>
        </div>
    )
}

export default AllComments
