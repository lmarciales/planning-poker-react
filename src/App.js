import { UserContext } from '@application/context/UserContext';
import Header from '@presentation/components/header/Header';
import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import UserModal from './presentation/components/userModal/UserModal';
import Home from './presentation/pages/home/Home';
import Room from './presentation/pages/room/Room';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className={`App ${user ? '' : 'show'}`} aria-label="app-navigation">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/:id" component={Room} />
          </Switch>
        </div>
        {!user && (
          <div className="modal">
            <UserModal />
          </div>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </main>
    </>
  );
}

export default App;
