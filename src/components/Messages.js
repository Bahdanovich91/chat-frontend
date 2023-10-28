import React, { useState, useEffect } from 'react';

function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/messages/1')
            .then(response => response.json())
            .then(data => {
                setMessages(Object.values(data));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = async (messageId) => {
        try {
            await fetch(`http://localhost/api/messages/${messageId}`, {
                method: 'DELETE'
            });

            const updatedMessages = messages.filter(message => message.id !== messageId);
            setMessages(updatedMessages);
        } catch (error) {
            console.error(error);
        }
    };

    const groupedMessages = {};
    messages.forEach(message => {
        const messageDate = new Date(message.created_at).toLocaleDateString();
        if (!groupedMessages[messageDate]) {
            groupedMessages[messageDate] = [];
        }
        groupedMessages[messageDate].push(message);
    });

    return (
        <div>
            {Object.keys(groupedMessages).map(date => (
                <div key={date}>
                    <h3>{date}</h3>
                    <ul>
                        {groupedMessages[date].map((message, index) => (
                            <li key={index}>
                                {message.text}
                                <div>Time: {new Date(message.created_at).toLocaleTimeString()}</div>
                                <button onClick={() => handleDelete(message.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Messages;