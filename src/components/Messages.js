import React, { useState, useEffect} from 'react';

function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/messages')
            .then(response => response.json())
            .then(data => {
                setMessages(Object.values(data));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const result = messages.map((message, index) => {
        return (
            <li key={index}>
                {message.title}
                <button >delete</button>
            </li>
        );
    });

    return <div>{result}</div>
}

export default Messages;