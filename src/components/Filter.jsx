export const Filter = ({ initialFilter, handleFilter }) => {
  return <input type="text" value={initialFilter} onChange={handleFilter} />;
};
