import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { UserContext } from '@application/context/UserContext';
import styles from './UserModal.module.scss';

const UserModal = () => {
  const [userInput, setUserInput] = useState('');
  const { setUser } = useContext(UserContext);

  const createUser = () => {
    const newUser = {
      name: userInput,
      id: uuid(),
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>
      <span>Let us know the username you want to use to join a Planning Poker Room</span>
      <form>
        <input
          type="text"
          value={userInput}
          aria-label="user-input"
          onChange={e => setUserInput(e.target.value)}
          minLength={2}
          required
        />
        <button onClick={createUser} type="submit" disabled={userInput.length < 1}>
          Join!
        </button>
      </form>
    </div>
  );
};

export default UserModal;
