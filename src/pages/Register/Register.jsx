import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import AccountInfo from './AccountInfo/AccountInfo'
import AdditionalInfo from './AdditionalInfo/AdditionalInfo'
/*import './Register.css'*/

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        dob: '',
        password: '',
        username: '',
        gender: 'not specified',
        address: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        navigate('/login')
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h2 className="text-center mb-4">
                        Registrazione a EpicBooks
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <PersonalInfo
                            formData={formData}
                            handleChange={handleChange}
                        />
                        <AccountInfo
                            formData={formData}
                            handleChange={handleChange}
                        />
                        <AdditionalInfo
                            formData={formData}
                            handleChange={handleChange}
                        />
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                        >
                            Registrati
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
