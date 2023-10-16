import React, { useState, useEffect } from 'react';
import './Chats.css'

function Chats() {
    const [chats, setChats] = useState([]);
    const [add, setAdd] = useState('');

    useEffect(() => {
        fetch('http://localhost/api/chats')
            .then(response => response.json())
            .then(data => {
                setChats(Object.values(data));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const result = chats.map((chat, index) => {
        return (
            <li key={index}>
                {chat.title}
                <button onClick={() => handleDeleteClick(index)}>delete</button>
            </li>
        );
    });

    function handleDeleteClick(index) {
        const updatedChats = [...chats];
        updatedChats.splice(index, 1);
        setChats(updatedChats);
    }

    function handleAddClick() {
        if (add !== '') {
            const newChat = {id: chats.length + 1, title: add};
            setChats([...chats, newChat]);
            setAdd('');
        }
    }

    return (
        <div className="container">
            <div className="chats_add">
                <input className='chats_input' onChange={event => setAdd(event.target.value)}/>
                <button className='chats_button' onClick={handleAddClick}>Add</button>
            </div>
            <ul>{result}</ul>
        </div>
    );
}

export default Chats;
