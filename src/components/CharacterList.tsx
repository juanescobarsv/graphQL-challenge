import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import type {
  GetCharactersData,
  GetCharactersVariables,
  CharacterListItem,
} from "../graphql/queries";
import { GET_CHARACTERS } from "../graphql/queries";
import CharacterCard from "./CharacterCard";
import LoadingSpinner from "../utils/Loading.Spinner";
import ErrorMessage from "../utils/ErrorMessage";

interface CharacterListProps {
  onCharacterClick: (id: string) => void;
  selectedCharacterId: string | null;
}

const CharacterList: React.FC<CharacterListProps> = ({
  onCharacterClick,
  selectedCharacterId,
}) => {
  const { data, loading, error, fetchMore } = useQuery<
    GetCharactersData,
    GetCharactersVariables
  >(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const [hasMore, setHasMore] = useState<boolean>(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !data) return;
    if (!data.characters.info.next && hasMore) {
      setHasMore(false);
      return;
    }

    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (
          scrollTop + clientHeight >= scrollHeight - 100 &&
          data.characters.info.next
        ) {
          if (loading) return;

          fetchMore({
            variables: {
              page: data.characters.info.next,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                characters: {
                  ...fetchMoreResult.characters,
                  results: [
                    ...prev.characters.results,
                    ...fetchMoreResult.characters.results,
                  ],
                },
              };
            },
          }).catch((err) =>
            console.error("Error fetching more characters:", err)
          );
          // } else if (!data.characters.info.next && hasMore) {
          //   setHasMore(false);
        }
      }
    };

    const currentListRef = listRef.current;
    if (currentListRef) {
      currentListRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentListRef) {
        currentListRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, data, fetchMore, hasMore]);

  if (error) return <ErrorMessage message={`Error: ${error.message}`} />;

  return (
    <div className="character-list-container" ref={listRef}>
      {loading && !data ? (
        <LoadingSpinner />
      ) : (
        <div className="character-grid">
          {data?.characters?.results.map((character: CharacterListItem) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => onCharacterClick(character.id)}
              isSelected={character.id === selectedCharacterId}
            />
          ))}
        </div>
      )}

      {loading && data && hasMore && <LoadingSpinner />}
      {!hasMore && data && (
        <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          You've reached the end of the list!
        </p>
      )}
      {!data?.characters?.results.length && !loading && !error && (
        <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          No characters found.
        </p>
      )}
    </div>
  );
};

export default CharacterList;
