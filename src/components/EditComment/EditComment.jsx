import { useState } from 'react'
import Swal from 'sweetalert2'
import { APIKEY } from '../../constants'
import { Modal, Form, Button } from 'react-bootstrap'

const EditComment = ({ isModalVisible, setIsModalVisible, asin }) => {
    const [modalFormState, setModalFormState] = useState({
        rate: '',
        comment: '',
        elementId: asin,
    })

    const endPointEdit = `https://striveschool-api.herokuapp.com/api/comments/${asin}`

    const closeModalArea = () => {
        setIsModalVisible(false)
        setModalFormState({ rate: '', comment: '', elementId: asin }) // per resettare il form
    }

    const handleInputChange = (e) => {
        const parseRate =
            e.target.name === 'rate' ? Number(e.target.value) : e.target.value
        setModalFormState({
            ...modalFormState,
            elementId: asin,
            [e.target.name]: parseRate,
        })
    }

    const editData = async (e) => {
        e.preventDefault()

        const result = await Swal.fire({
            title: 'Do you want to edit this comment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(endPointEdit, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${APIKEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(modalFormState),
                })

                if (response.ok) {
                    Swal.fire('Saved!', '', 'success')
                    // Optionally reset form
                    setModalFormState({
                        rate: '',
                        comment: '',
                        elementId: asin,
                    })
                } else {
                    Swal.fire('Error!', 'Something went wrong.', 'error')
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
        <Modal show={isModalVisible}>
            <Modal.Header>
                <Modal.Title>Titolo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={editData}>
                    <Form.Control
                        type="number"
                        min={1}
                        max={5}
                        required={true}
                        name="rate"
                        onChange={handleInputChange}
                        placeholder="Rate"
                    />

                    <Form.Control
                        type="text"
                        required={true}
                        name="comment"
                        onChange={handleInputChange}
                        placeholder="Comment"
                    />

                    <Button type="submit" variant="success">
                        Edit Comment
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModalArea} variant="danger">
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditComment
