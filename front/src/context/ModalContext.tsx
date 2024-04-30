'use client'
import React, { createContext, useContext, useState } from 'react';

type ModalContextType = {
    showModal: boolean 
    index: number
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    setIndex: React.Dispatch<React.SetStateAction<number>>
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    return (
        <ModalContext.Provider value={{ showModal, setShowModal, index, setIndex }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};

