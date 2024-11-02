import React from 'react'
import { Form } from 'react-bootstrap'

const PersonalInfo = ({ formData, handleChange }) => {
    return (
        <>
            <Form.Group controlId="name" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="surname" className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="dob" className="mb-3">
                <Form.Label>Data di Nascita</Form.Label>
                <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
        </>
    )
}

export default PersonalInfo
