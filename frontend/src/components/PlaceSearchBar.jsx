export default function PlaceSearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Find Places..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "70%",
            border: '1px solid',
            borderRadius: '8px'
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "20%",
            borderRadius: '8px',
            cursor: 'pointer' //changed to finger on hover
          }}>
          Search
        </button>
      </form>
    </div>
  );
}