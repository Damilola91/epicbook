import { Container, Row } from 'react-bootstrap'
import fantasy from '../dataSource/books/fantasy.json'
import history from '../dataSource/books/history.json'
import romance from '../dataSource/books/romance.json'
import horror from '../dataSource/books/horror.json'
import scifi from '../dataSource/books/scifi.json'
import BookCard from '../BookCard/BookCard'

const MainSection = () => {
    const allBooks = [...fantasy, ...history, ...romance, ...horror, ...scifi]
    const randomBooks = allBooks.sort(() => Math.random() -0.5)
    console.log(randomBooks)

    return (
        <Container>
            <Row className="gy-2">
                {randomBooks.map((book) => (
                    <BookCard
                        title={book.title}
                        price={book.price}
                        category={book.category}
                        img={book.img}
                    />
                )).slice(0, 20)}
            </Row>
        </Container>
    )
}

export default MainSection
