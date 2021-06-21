import { UserContext } from '@application/context/UserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const route = useHistory();
  const { user } = useContext(UserContext);
  return (
    <nav className={styles.navbar}>
      <div onClick={() => route.push('/')}>Planning Poker</div>
      {user && <div>{user.name}</div>}
    </nav>
  );
};

export default Header;
