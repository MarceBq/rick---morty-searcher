export const searchCharacter = async ({ query }) => {
  if (query === "") return null;
  const toLowerQuery = query.toLowerCase();

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${toLowerQuery}`
    );

    const json = await response.json();
    const characters = json.results;

    return characters;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
