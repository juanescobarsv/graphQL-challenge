import { gql } from "@apollo/client";

export interface CharacterListItem {
  id: string;
  name: string;
  species: string;
}

export interface CharacterDetailItem {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: Episode[];
}

export interface CharacterOrigin {
  name: string;
}

export interface CharacterLocation {
  name: string;
}

export interface Episode {
  id: string;
  name: string;
  episode: string;
}

// graphQL Queries
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        species
        origin {
          name
        }
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`;

// GET_CHARACTERS query response and variables
export interface GetCharactersData {
  characters: {
    info: CharactersInfo;
    results: CharacterListItem[];
  };
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface GetCharactersVariables {
  page: number;
}

// GET_CHARACTER_DETAILS query response and variables
export interface GetCharacterDetailsData {
  character: CharacterDetailItem;
}

export interface GetCharacterDetailsVariables {
  id: string;
}
