import { useCallback, useState } from "react";
import "./App.css";
import Characters from "./components/Characters";
import useCharacter from "./hooks/useCharacters";
import useQuery from "./hooks/useQuery";

function App() {
  const [filters, setFilters] = useState({
    isAlive: false,
    isDead: false,
    isUnknown: false,
  });

  const { query, setQuery, error } = useQuery();

  const { characters, getCharacters, loading } = useCharacter({
    query,
    filters,
  });

  function handleSubmit(event) {
    event.preventDefault();
    getCharacters();
  }

  function handleChangeValue(event) {
    setQuery(event.target.value);
  }

  const handleFilterChange = useCallback((event) => {
    const { name, checked } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  }, []);

  return (
    <div className="main-body">
      <header>
        <h1>Searching ur data</h1>
        <form className="character-form" onSubmit={handleSubmit}>
          <div className="search">
            <label htmlFor="input-search">Search ur character</label>
            <input
              type="text"
              name="input-search"
              placeholder="Rick, Morty, Summer..."
              onChange={handleChangeValue}
              value={query}
              required
            />
            <button type="submit">Search</button>
            <label htmlFor="isAlive">Living Character</label>
            <input
              type="checkbox"
              name="isAlive"
              onChange={handleFilterChange}
              checked={filters.isAlive}
            />

            <label htmlFor="isDead">Defeat Character</label>
            <input
              type="checkbox"
              name="isDead"
              onChange={handleFilterChange}
              checked={filters.isDead}
            />

            <label htmlFor="isUnknown">Unknown Character</label>
            <input
              type="checkbox"
              name="isUnknown"
              onChange={handleFilterChange}
              checked={filters.isUnknown}
            />
          </div>
        </form>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </header>

      {loading ? <p>Loading...</p> : <Characters characters={characters} />}
    </div>
  );
}

export default App;
