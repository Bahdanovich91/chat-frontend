import React from 'react';
import './App.css'
import Header from './components/Header';
import Chats from './components/Chats'
import Messages from './components/Messages'

function App() {
    return <div>
        <Header />
        <div className='content'>
            <Chats />
            <div className='messages'>
                <Messages />
            </div>
        </div>
    </div>
}

export default App;
