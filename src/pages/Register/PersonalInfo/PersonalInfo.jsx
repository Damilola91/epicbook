import { Form } from 'react-bootstrap'

const PersonalInfo = ({ formData, handleChange, errors }) => {
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
                    isInvalid={errors.name}
                />
                {errors.name && (
                    <Form.Control.Feedback type="invalid">
                        Il nome è obbligatorio e deve contenere almeno 3
                        caratteri.
                    </Form.Control.Feedback>
                )}
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
                    isInvalid={errors.surname}
                />
                {errors.surname && (
                    <Form.Control.Feedback type="invalid">
                        Il cognome è obbligatorio e deve contenere almeno 3
                        caratteri.
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group controlId="dob" className="mb-3">
                <Form.Label>Data di Nascita</Form.Label>
                <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    isInvalid={errors.dob}
                />
                {errors.dob && (
                    <Form.Control.Feedback type="invalid">
                        La data di nascita è obbligatoria.
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        </>
    )
}

export default PersonalInfo
