import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PersonalInfo from './PersonalInfo/PersonalInfo'
import AccountInfo from './AccountInfo/AccountInfo'
import AdditionalInfo from './AdditionalInfo/AdditionalInfo'
import Swal from 'sweetalert2'

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
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name || formData.name.length < 3) newErrors.name = true
        if (!formData.surname || formData.surname.length < 3)
            newErrors.surname = true
        if (!formData.dob) newErrors.dob = true
        if (!formData.email) newErrors.email = true
        if (!formData.password || formData.password.length < 8)
            newErrors.password = true
        if (!formData.username || formData.username.length < 8)
            newErrors.username = true
        if (!formData.gender || formData.gender === 'not specified')
            newErrors.gender = true
        if (!formData.address) newErrors.address = true
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorData.message || 'Something went wrong!',
                })
                return
            }

            const data = await response.json()
            Swal.fire({
                icon: 'success',
                title: 'Successo!',
                text: 'Utente registrato correttamente!',
            }).then(() => {
                navigate('/')
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Errore',
                text: 'Si è verificato un errore durante la registrazione.',
            })
        }
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
                            errors={errors}
                        />
                        <AccountInfo
                            formData={formData}
                            handleChange={handleChange}
                            errors={errors}
                        />
                        <AdditionalInfo
                            formData={formData}
                            handleChange={handleChange}
                            errors={errors}
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
