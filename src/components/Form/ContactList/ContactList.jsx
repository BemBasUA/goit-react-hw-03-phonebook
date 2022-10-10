import PropTypes from 'prop-types';

export const ContactList = ({ data, onClick }) => {
  return (
    <ul>
      {data.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name}: {contact.number}{' '}
            <button type="button" onClick={() => onClick(contact.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
};
