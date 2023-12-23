import { nanoid } from 'nanoid';

export const Contacts = ({ showFiltered, deleteContact }) => {
  return (
    <ul>
      {showFiltered() !== undefined ? (
        showFiltered().map(contact => {
          return (
            <li key={nanoid()}>
              <p>
                {contact.name}: {contact.number}
              </p>
              <button
                type="button"
                onClick={() => {
                  deleteContact(contact.name);
                }}
              >
                delete
              </button>
            </li>
          );
        })
      ) : (
        <p>Phone book is empty...</p>
      )}
    </ul>
  );
};
