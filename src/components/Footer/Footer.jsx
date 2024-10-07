import { Col, Container, Row } from 'react-bootstrap'
import { navLinks } from '../../components/dataSource/navData'
import { LogoInstagram, LogoTiktok, LogoTwitter } from 'react-ionicons'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

const Footer = () => {
    const { isDarkMode } = useContext(ThemeContext)
    return (
        <footer
            className={`text-center py-3 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            data-testid="footer"
        >
            <Container>
                <Row>
                    <Col>
                        <div className="d-flex flex-column gap-2 justify-content-center align-items-center">
                            <div>
                                <h2 data-testid="footer-title">Book Store</h2>
                            </div>

                            <div className="d-flex gap-3">
                                {navLinks.map((link, index) => (
                                    <a
                                        className={`text-decoration-none ${isDarkMode ? 'text-white' : 'text-dark'}`}
                                        href={link.href}
                                        key={index}
                                        data-testid={`nav-link-${index}`}
                                    >
                                        {link.text}
                                    </a>
                                ))}
                            </div>

                            <div className="d-flex gap-3 align-items-center justify-content-center">
                                <LogoTwitter
                                    color={isDarkMode ? 'white' : 'dark'}
                                    title="Twitter"
                                    height="40px"
                                    width="40px"
                                    data-testid="twitter-icon"
                                />

                                <LogoTiktok
                                    color={isDarkMode ? 'white' : 'dark'}
                                    title="Tiktok"
                                    height="40px"
                                    width="40px"
                                    data-testid="tiktok-icon"
                                />

                                <LogoInstagram
                                    color={isDarkMode ? 'white' : 'dark'}
                                    title="Instagram"
                                    height="40px"
                                    width="40px"
                                    data-testid="instagram-icon"
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
