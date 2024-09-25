import { useEffect, useRef, useState } from "react";

export default function useQuery() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const ifFirstInput = useRef(true);

  useEffect(() => {
    if (ifFirstInput.current) {
      ifFirstInput.current = query === "";

      return;
    }
    if (query === "") {
      setError("The value is empty");

      return;
    }
    if (query.length < 3) {
      setError("The value needs to have more elements");

      return;
    }

    setError(null);
  }, [query]);

  return { query, setQuery, error };
}
