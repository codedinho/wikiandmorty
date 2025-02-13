import Breadcrumbs from "@/components/Breadcrumbs";
import CharacterList from "@/components/CharacterList";
import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTERS } from "@/lib/graphql/queries";

export default async function Characters() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters = data.characters.results; // Ensure these objects have species and origin fields

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto py-8">
        <nav className="max-w-7xl mx-auto py-4">
          <Breadcrumbs />
        </nav>
        <h1 className="text-3xl font-bold mb-6">Characters</h1>
        <CharacterList characters={characters} />
      </main>
    </div>
  );
} 