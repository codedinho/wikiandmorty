export const GET_CHARACTERS = `
  query GetCharacters {
    characters(page: 1) {
      results {
        id
        name
        image
        species
        origin {
          name
        }
      }
    }
  }
`;

export const GET_LOCATIONS = `
  query GetLocations($page: Int) {
    locations(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        type
        dimension
      }
    }
  }
`;

export const GET_EPISODES = `
  query GetEpisodes {
    episodes(page: 1) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export const GET_EPISODES_WITH_INFO = `
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        air_date
        episode
        created
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

export const GET_CHARACTERS_WITH_EPISODES = `
  query GetCharactersWithEpisodes($page: Int) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        image
        species
        episode {
          id
        }
      }
    }
  }
`;

// New query that includes paging info so we can iterate through all pages.
export const GET_CHARACTERS_WITH_INFO = `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        image
        species
        gender
        status
        origin {
          name
        }
      }
    }
  }
`;

export const GET_LOCATION = `
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
        species
      }
    }
  }
`;

export const GET_CHARACTER_DETAIL = `
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      id
      name
      species
      image
      status
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
      }
      created
    }
  }
`; 