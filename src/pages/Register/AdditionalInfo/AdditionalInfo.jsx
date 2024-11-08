import { Form } from 'react-bootstrap'

const AdditionalInfo = ({ formData, handleChange, errors }) => {
    return (
        <>
            <Form.Group controlId="gender" className="mb-3">
                <Form.Label>Genere</Form.Label>
                <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    isInvalid={errors.gender}
                >
                    <option value="not specified">Non specificato</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="L">Lesbian</option>
                    <option value="G">Gay</option>
                    <option value="T">Transgender</option>
                </Form.Select>
                {errors.gender && (
                    <Form.Control.Feedback type="invalid">
                        Il genere è obbligatorio.
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    isInvalid={errors.address}
                />
                {errors.address && (
                    <Form.Control.Feedback type="invalid">
                        L'indirizzo è obbligatorio.
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        </>
    )
}

export default AdditionalInfo
