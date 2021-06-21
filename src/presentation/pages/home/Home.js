import { UserContext } from '@application/context/UserContext';
import { RoomService } from '@infrastructure/api/room.service';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
  const [roomInput, setRoomInput] = useState('');
  const { user } = useContext(UserContext);
  const router = useHistory();
  const [selectedOption, setSelectedOption] = useState(1);
  const [customSeries, setCustomSeries] = useState('');

  const selectOptions = [
    { value: 1, label: 'Fibonacci (1,2,3,5,8,13)', series: [1, 2, 3, 5, 8, 13] },
    { value: 0, label: 'Custom...' },
  ];

  const customSeriesRender = () => {
    if (selectedOption === 0) {
      return (
        <>
          <input
            type="text"
            value={customSeries}
            onChange={e => setCustomSeries(e.target.value)}
            placeholder="Write numbers separated by comas"
          />
        </>
      );
    }
  };

  const createRoom = () => {
    const series =
      selectedOption === 0
        ? customSeries.split(',')
        : selectOptions.find(option => option.value === selectedOption).series;

    const newRoom = {
      name: roomInput,
      series,
      moderators: [user.id],
      participants: [{ ...user }],
      showResult: false,
      createdAt: new Date().toISOString(),
    };

    RoomService()
      .create(newRoom)
      .then(response => router.push(`/${response.id}`));
  };

  return (
    <form onSubmit={e => e.preventDefault()} className={styles.container}>
      <h1>Create your room and start the game!</h1>
      <input
        type="text"
        value={roomInput}
        aria-label="room-input"
        onChange={e => setRoomInput(e.target.value)}
        required
      />
      <select
        name="series"
        id="series"
        value={selectedOption}
        aria-label="series-select"
        onChange={e => setSelectedOption(+e.target.value)}
      >
        {selectOptions.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {customSeriesRender()}
      <button
        onClick={createRoom}
        type="submit"
        disabled={roomInput.length < 1 || selectedOption === 0 ? customSeries.length < 1 : null}
      >
        Create Room
      </button>
    </form>
  );
};

export default Home;
