import { useState, createContext, useContext } from "react";

const AIContext = createContext([]);

export const AIContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    
    window.addAIMessage ??= (message, sentBySelf) => {
        setMessages(old => [...old, { content: message, sentBySelf }])
    }

    return <AIContext.Provider value={messages}>

        {console.log(messages)}
        {children}
    </AIContext.Provider>
};

export const useAIMessages = () => {
    const assistanceService = useContext(AIContext);
    if (assistanceService === undefined) {
        throw new Error('useAIMessages must be used within a AIContextProvider');
    }
    return assistanceService;
}