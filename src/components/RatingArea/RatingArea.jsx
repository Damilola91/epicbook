import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { APIKEY } from '../../constants'
import Swal from 'sweetalert2'

const RatingArea = ({ asin, onHide, onEditComment }) => {
    const [formState, setFormState] = useState({})
    console.log(formState)

    const handleInputChange = (e) => {
        const parseRate =
            e.target.name === 'rate' ? Number(e.target.value) : e.target.value
        setFormState({
            ...formState,
            elementId: asin,
            [e.target.name]: parseRate,
        })
    }

    const endPointPost = 'https://striveschool-api.herokuapp.com/api/comments/'

    const onSubmit = async (e) => {
        e.preventDefault()

        const result = await Swal.fire({
            title: 'Do you want to add this comment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(endPointPost, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${APIKEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formState),
                })

                if (response.ok) {
                    Swal.fire('Saved!', '', 'success').then(() => {
                        onHide()
                    })
                    // Optionally reset form
                    setFormState({})
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
        <Form onSubmit={onSubmit}>
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

            <div className="d-flex">
                <Button type="submit" variant="success">
                    Invia Commento
                </Button>

                <Button
                    type="button"
                    onClick={onEditComment}
                    variant="btn btn-outline-warning"
                >
                    Modifica Commento
                </Button>
            </div>
        </Form>
    )
}

export default RatingArea
