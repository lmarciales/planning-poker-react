import PropTypes from 'prop-types';
import styles from './CardToggle.module.scss';

const CardToggle = props => {
  return (
    <div
      className={`${styles.card} ${props.item.toggle ? styles.active : ''}`}
      onClick={() => props.toggle(props.item)}
    >
      {props.item.value}
    </div>
  );
};

CardToggle.propTypes = {
  item: PropTypes.object,
  toggle: PropTypes.func,
};

export default CardToggle;
