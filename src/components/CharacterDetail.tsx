import React from "react";
import { useQuery } from "@apollo/client";
import type {
  CharacterDetailItem,
  GetCharacterDetailsData,
  GetCharacterDetailsVariables,
} from "../graphql/queries";
import { GET_CHARACTER_DETAILS } from "../graphql/queries";
import LoadingSpinner from "../utils/Loading.Spinner";
import ErrorMessage from "../utils/ErrorMessage";

interface CharacterDetailProps {
  characterId: string | null;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ characterId }) => {
  const { loading, error, data } = useQuery<
    GetCharacterDetailsData,
    GetCharacterDetailsVariables
  >(GET_CHARACTER_DETAILS, {
    variables: { id: characterId || "" },
    skip: !characterId,
  });

  if (!characterId) {
    return (
      <div className="character-detail-placeholder">
        <p>Select a character to see the details</p>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={`Error: ${error.message}`} />;

  const character: CharacterDetailItem | null | undefined = data?.character;

  if (!character) {
    return (
      <div className="character-detail-not-found">
        <p>Character not found</p>
      </div>
    );
  }

  const episodesToDisplay = character.episode.slice(0, 5);

  return (
    <div className="character-detail-container">
      <h2 className="detail-name">{character.name}</h2>

      <img
        src={character.image}
        alt={character.name}
        className="detail-image"
      />

      <div className="detail-section">
        <h3>General Information</h3>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        {/* Removed: Type, as per requirements */}
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
      </div>

      <div className="detail-section">
        <h3>Origin & Location</h3>
        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Last Known Location:</strong> {character.location.name}
        </p>
      </div>

      <div className="detail-section">
        <h3>Episodes</h3>
        {episodesToDisplay.length > 0 ? (
          <ul className="episode-list">
            {episodesToDisplay.map((ep) => (
              <li key={ep.id}>
                {ep.episode}: {ep.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No episodes found for this character</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
