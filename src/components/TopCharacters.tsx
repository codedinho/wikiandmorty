import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTERS_WITH_EPISODES } from "@/lib/graphql/queries";
import Link from "next/link";
// Define the character type based on the expected GraphQL response.
interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  episode: { id: string }[];
}

export default async function TopCharacters() {
  // Fetch the first page of characters including their episodes
  const data = await fetchGraphQL(GET_CHARACTERS_WITH_EPISODES, { page: 1 });
  const characters: Character[] = data?.characters?.results || [];

  // Sort characters by how many episodes they appear in (descending) and pick the top 3
  const topCharacters = characters
    .sort((a, b) => b.episode.length - a.episode.length)
    .slice(0, 3);

  return (
    <section className="w-full px-4 mt-12 mb-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold font-header mb-1 text-left">
        Most Seen Characters
      </h2>      
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 text-left font-light">
        You'll be seeing a lot of these guys
      </p>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {topCharacters.map((character: Character) => (
          <Link
            key={character.id}
            href={`/characters/${character.id}`}
            className="flex-1"
          >
            <div
              className="flex flex-col md:flex-row bg-white dark:bg-gray-700 p-4 rounded-lg shadow transition transform duration-300 hover:scale-105 hover:shadow-md cursor-pointer"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="mt-2 md:mt-0 md:ml-4 text-left">
                <h3 className="text-lg font-bold">{character.name}</h3>
                <p className="text-sm text-gray-300">{character.species}</p>
              </div>
              <div className="mt-2 md:mt-0 md:ml-auto text-left">
                <span className="text-xl font-bold text-mainColor">
                  {character.episode.length}
                </span>
                <p className="text-sm text-gray-300">Episodes</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 