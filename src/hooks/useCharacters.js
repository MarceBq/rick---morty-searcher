import { useCallback, useMemo, useRef, useState } from "react";
import { searchCharacter } from "../services/character";

export default function useCharacter({ query, filters }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previusQuery = useRef("");

  const getCharacters = useCallback(async () => {
    if (query === previusQuery.current) return;

    previusQuery.current = query;
    setLoading(true);
    try {
      const newCharacters = await searchCharacter({ query });
      setCharacters(newCharacters);
      setError(null);
    } catch (e) {
      setError("Error searching characters");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const filteredCharacters = useMemo(() => {
    if (!filters.isAlive && !filters.isDead && !filters.isUnknown) {
      return characters;
    }

    return characters.filter((character) => {
      if (filters.isAlive && character.status === "Alive") return true;
      if (filters.isDead && character.status === "Dead") return true;
      if (filters.isUnknown && character.status === "unknown") return true;
      return false;
    });
  }, [characters, filters]);

  return { characters: filteredCharacters, getCharacters, loading };
}
