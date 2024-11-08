import { Form } from 'react-bootstrap'

const AccountInfo = ({ formData, handleChange, errors }) => {
    return (
        <>
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    isInvalid={errors.email}
                />
                {errors.email && (
                    <Form.Control.Feedback type="invalid">
                        L'email è obbligatoria e deve essere valida.
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="8"
                    isInvalid={errors.password}
                />
                {errors.password && (
                    <Form.Control.Feedback type="invalid">
                        La password è obbligatoria e deve contenere almeno 8
                        caratteri.
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength="8"
                    isInvalid={errors.username}
                />
                {errors.username && (
                    <Form.Control.Feedback type="invalid">
                        L'username è obbligatorio e deve contenere almeno 8
                        caratteri.
                    </Form.Control.Feedback>
                )}
            </Form.Group>
        </>
    )
}

export default AccountInfo
