import './App.css';
import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import fs from './infrastructure/api';

function App() {
  const [roomInput, setRoomInput] = useState('');
  const [userInput, setUserInput] = useState('');

  const roomRef = fs.collection('rooms');
  const [rooms] = useCollectionData(roomRef);

  useEffect(() => {
    return sessionStorage.clear();
  }, []);

  const createUser = () => {
    sessionStorage.setItem('user', userInput);
  };

  const createRoom = () => {
    roomRef.add({
      room: roomInput,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {sessionStorage.getItem('user')}
        <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} />
        <button onClick={() => createUser()}>Create User</button>
        <input type="text" value={roomInput} onChange={e => setRoomInput(e.target.value)} />
        <button onClick={() => createRoom()}>Create Room</button>
        {rooms && rooms.map((room, index) => <div key={index}>{room.room}</div>)}
      </header>
    </div>
  );
}

export default App;
