import { Form } from 'react-bootstrap'

const AdditionalInfo = ({ formData, handleChange }) => {
    return (
        <>
            <Form.Group controlId="gender" className="mb-3">
                <Form.Label>Genere</Form.Label>
                <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="not specified">Non specificato</option>
                    <option value="M">Maschile</option>
                    <option value="F">Femminile</option>
                    <option value="L">Lesbica</option>
                    <option value="G">Gay</option>
                    <option value="T">Transgender</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </Form.Group>
        </>
    )
}

export default AdditionalInfo
