import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import AllComments from '../components/AllCommets/AllComments'
import { screen, waitFor, render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeContextProvider } from '../components/contexts/ThemeContext'

fetchMock.enableMocks()
beforeEach(() => {
    fetchMock.resetMocks()
})

describe('Test AllComments Component', () => {
    it('should fetch correctly data', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify([
                {
                    comment: 'test',
                    author: 'dami',
                    rate: '5',
                    _id: '0123',
                },
            ])
        )
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <AllComments asin="123" />
                </ThemeContextProvider>
            </MemoryRouter>
        )
        await waitFor(() => {
            expect(screen.getByText('test')).toBeInTheDocument()
        })
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(
            `https://striveschool-api.herokuapp.com/api/books/123/comments/`,
            {
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAxMTVkZTBmMzg1MDAwMTUxYzE3ODIiLCJpYXQiOjE3MjgxNjk5MDgsImV4cCI6MTcyOTM3OTUwOH0.d_uHpfcbQtD9yDyT-WQ4zHjJotpv4pxAp6el5hLNAyw',
                },
            }
        )

        expect(screen.getByText('Invia Commento')).toBeInTheDocument()
    })

    it('should handle input change correctly', () => {
        render(
            <MemoryRouter>
                <ThemeContextProvider>
                    <AllComments asin="123" />
                </ThemeContextProvider>
            </MemoryRouter>
        )

        expect(screen.getByPlaceholderText('Rate')).toBeInTheDocument()
        const inputElement = screen.getByPlaceholderText('Rate')
        fireEvent.change(inputElement, {
            target: {
                value: '5',
            },
        })
        expect(screen.getByPlaceholderText('Rate')).toHaveValue(5)
        expect(screen.getByPlaceholderText('Comment')).toBeInTheDocument()
        const inputCommentElement = screen.getByPlaceholderText('Comment')
        fireEvent.change(inputCommentElement, {
            target: {
                value: 'ciao',
            },
        })
        expect(inputCommentElement).toHaveValue('ciao')
    })
})
