const colorByState = {
  Alive: "00ff32",
  Dead: "ff0000",
  unknown: "636363",
};

export default function Character({ characters }) {
  return (
    <ul className="characters">
      {characters.map((character) => (
        <li className="character" key={character.id}>
          <h2>{character.name}</h2>
          <h3
            style={{ color: `#${colorByState[character.status] || "000000"}` }}
          >
            {character.status}
          </h3>
          <img src={character.image} alt={character.name} />
        </li>
      ))}
    </ul>
  );
}
