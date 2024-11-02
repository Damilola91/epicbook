import { createContext, useState } from 'react'

export const CommentSelectedCard = createContext()

export const CommentSelectedCardProvider = ({ children }) => {
    const [selectedCardId, setSelectedCardId] = useState(null)
    const toggleIsSelect = (_id) => {
        setSelectedCardId((prevId) => (prevId === _id ? null : _id))
    }

    return (
        <CommentSelectedCard.Provider
            value={{ selectedCardId, toggleIsSelect, setSelectedCardId }}
        >
            {children}
        </CommentSelectedCard.Provider>
    )
}
