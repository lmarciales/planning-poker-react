import { UserContext } from '@application/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RoomService } from '@infrastructure/api/room.service';
import CardToggle from '@presentation/components/cardToggle/CardToggle';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Room.module.scss';

const Room = () => {
  const route = useHistory();
  const routeParams = useParams();
  const [room, isRoomLoading] = useDocumentData(RoomService().get(routeParams.id));
  const roomR = useRef(room);
  const { user } = useContext(UserContext);
  const [vote, setVote] = useState([]);

  const updateRoom = roomToUpdate => {
    RoomService().update(routeParams.id, roomToUpdate);
    roomR.current = room;
  };

  const userLeft = () => {
    const participants = roomR.current.participants;
    if (participants) {
      const userFound = participants.find(roomUser => roomUser.id === user.id);

      if (userFound) {
        userFound.action = 'leave';
        updateRoom(roomR.current);
      }
    }
  };

  const handleActiveCard = item => {
    vote.forEach(s => {
      if (s.value === item.value) {
        s.toggle = true;
      } else if (s.toggle && s.value !== item.value) {
        s.toggle = false;
      }
    });
    setVote(vote);
    room.participants.find(participant => participant.id === user.id).vote = item.value;
    updateRoom(room);
  };

  const shareRoom = () => {
    navigator.clipboard.writeText(location.href).then(() => {
      toast.dark('Room added to the clipboard!');
    });
  };

  const clearVotes = () => {
    room.participants.forEach(participant => (participant.vote = ''));
    setVote([...room.series.map(s => ({ value: s, toggle: false }))]);
    room.showResult = false;
    updateRoom(room);
  };

  const showResults = () => {
    room.showResult = true;
    room.votes = room.participants.reduce((voted, current) => (current.vote ? (voted += 1) : 0), 0);
    room.average =
      room.participants.reduce((voted, current) => (current.vote ? (voted += current.vote) : 0), 0) / room.votes;
    updateRoom(room);
  };

  useEffect(() => {
    if (!room && !isRoomLoading) {
      route.push('/');
    } else if (room && !isRoomLoading) {
      setVote([...room.series.map(s => ({ value: s, toggle: false }))]);
      const userFound = room.participants.find(participant => participant.id === user.id);

      if (user && !userFound) {
        room.participants.push({ ...user, action: 'join' });
        updateRoom(room);
      }
    }
  }, [user, isRoomLoading]);

  useEffect(() => {
    roomR.current = room;

    if (room) {
      room.participants.forEach((participant, index) => {
        if (participant.action === 'join' && participant.name !== user.name) {
          toast.dark(`${participant.name} joined.`);
          participant.action = '';
          updateRoom(room);
        } else if (participant.action === 'leave') {
          toast.dark(`${participant.name} Left.`);
          room.participants.splice(index, 1);
          participant.action = '';
          updateRoom(room);
        }
      });
    }
  }, [room]);

  useEffect(() => {
    window.addEventListener('beforeunload', userLeft);
    return () => window.removeEventListener('beforeunload', userLeft);
  }, []);

  useEffect(() => {
    return userLeft;
  }, []);

  return (
    <div>
      <section className={styles.container}>
        <h1>
          {room && room.name}{' '}
          <span className={styles.iconShare} aria-label="share-icon" onClick={() => shareRoom()}>
            <FontAwesomeIcon icon="share-square" />
          </span>
        </h1>
      </section>
      {room &&
        room.moderators.map(
          mod =>
            mod === user.id && (
              <div key={mod}>
                <button onClick={clearVotes} disabled={!room.showResult}>
                  Clear votes
                </button>
                <button onClick={showResults} disabled={room.showResult}>
                  Show results
                </button>
              </div>
            ),
        )}
      <section className={styles.container}>
        <h2>Participants</h2>
        {room &&
          room.participants.map(participant => (
            <div className={`${styles.participantsList} ${participant.vote ? styles.voted : ''}`} key={participant.id}>
              <span>{participant.name}</span>
              {room.showResult ? <span>{participant.vote}</span> : null}
            </div>
          ))}
        {room && room.showResult ? (
          <div className={styles.results}>
            <h3>Results</h3>
            <p>
              <strong># of votes:</strong> {room.votes}
            </p>
            <p>
              <strong>Average:</strong> {isNaN(room.average) ? 0 : room.average}
            </p>
          </div>
        ) : null}
      </section>
      <section className={`${styles.container} ${room && room.showResult ? styles.disabled : ''}`}>
        <span>Choose your card</span>
        <div className={styles.cardList}>
          {vote && vote.map((series, index) => <CardToggle item={series} key={index} toggle={handleActiveCard} />)}
        </div>
      </section>
    </div>
  );
};

export default Room;
