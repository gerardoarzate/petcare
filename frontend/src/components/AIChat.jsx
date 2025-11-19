import styles from './Chat.module.css';
import SendIcon from '../assets/material-symbols--send.svg?react';
import { Message } from './Message';
import { useAIMessages } from '../contexts/AIContext';
import { useState, useRef, useEffect } from 'react';

export const AIChat = () => {
    const messages = useAIMessages();
    const [inputValue, setInputValue] = useState('');
    const messagesContainerRef = useRef();
    
    const scrollDown = () => {
        const el = messagesContainerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }

    useEffect(scrollDown, [messages]);
    useEffect(scrollDown, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSend = () => {
        if (!inputValue) {
            return;
        }
        window.ai.askAssistant(inputValue);
        setInputValue('');
    }

    return (
        <div className={styles.chat}>
            <div className={styles.messagesContainer} ref={messagesContainerRef}>
                { messages.map((msg, i) => (
                    <Message
                        key={i}
                        content={msg.content}
                        sentBySelf={msg.sentBySelf}
                    />
                )) }
            </div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className={styles.button} onClick={handleSend}>
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}