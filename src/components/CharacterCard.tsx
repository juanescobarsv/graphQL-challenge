import React from "react";
import type { CharacterListItem } from "../graphql/queries";

interface CharacterCardProps {
  character: CharacterListItem;
  onClick: () => void;
  isSelected: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
  isSelected,
}) => {
  console.log("CharacterCard rendered. Character prop:", character);
  console.log("Character name:", character?.name);

  return (
    <div
      className={`character-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div>
        <h3 className="character-card-name">{character.name}</h3>
        <p className="character-card-species">{character.species}</p>
      </div>
      <span className="character-card-arrow">&gt;</span>
    </div>
  );
};

export default CharacterCard;
