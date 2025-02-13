import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTERS_WITH_INFO } from "@/lib/graphql/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import CharacterList from "@/components/CharacterList";
import Link from "next/link";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
};

async function getCharactersByOrigin(origin: string): Promise<Character[]> {
  let allCharacters: Character[] = [];
  let currentPage = 1;
  let totalPages = Infinity;

  while (currentPage <= totalPages) {
    const data = await fetchGraphQL(GET_CHARACTERS_WITH_INFO, { page: currentPage });
    
    if (data?.characters?.info) {
      totalPages = data.characters.info.pages;
    } else {
      break;
    }
    
    allCharacters.push(...data.characters.results);
    currentPage++;
  }

  return allCharacters.filter((character) => 
    character.origin &&
    character.origin.name.toLowerCase().includes(origin.toLowerCase())
  );
}

export default async function OriginPage({
  params,
}: {
  params: { origin: string };
}) {
  const { origin } = params;
  const characters = await getCharactersByOrigin(origin);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto py-8">
        <nav className="max-w-7xl mx-auto py-4">
          <Breadcrumbs />
        </nav>        
        <h1 className="text-3xl font-bold mb-6">Characters from "{origin}"</h1>
        <CharacterList characters={characters} />
      </main>
    </div>
  );
} 