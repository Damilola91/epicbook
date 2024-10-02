import { createContext, useState } from 'react'

export const CommentSelectedCard = createContext()

export const CommentSelectedCardProvider = ({ children }) => {
    const [selectedCardAsin, setSelectedCardAsin] = useState(null)
    const toggleIsSelect = (asin) => {
        setSelectedCardAsin((prevAsin) => (prevAsin === asin ? null : asin))
    }

    return (
        <CommentSelectedCard.Provider
            value={{ selectedCardAsin, toggleIsSelect, setSelectedCardAsin }}
        >
            {children}
        </CommentSelectedCard.Provider>
    )
}
