import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTER_DETAIL } from "@/lib/graphql/queries";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, XCircle, Mars, Venus, MapPin } from "lucide-react";

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetchGraphQL(GET_CHARACTER_DETAIL, { id });
  const character = data?.character;

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Character not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground mt-4">
      <main className="max-w-7xl mx-auto py-8 px-4">
        <Breadcrumbs />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Left Column: Character Card */}
          <div className="md:w-1/2">
            <div className="bg-white dark:bg-background rounded-lg shadow overflow-hidden">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">{character.name}</h1>
                <p className="mb-2">
                  <span className="font-medium">Species: </span>
                  {character.species}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {(character.status || "Alive") === "Alive" ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-500" />
                  )}
                  <span className="font-medium">
                    {character.status || "Alive"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {(character.gender || "Male") === "Male" ? (
                    <Mars size={16} className="text-blue-500" />
                  ) : (
                    <Venus size={16} className="text-pink-500" />
                  )}
                  <span className="font-medium">
                    {character.gender || "Male"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  <span>{character.origin?.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Episodes Featured In */}
          <div className="md:w-1/2">
            <div className="bg-white dark:bg-background rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Featured in</h2>
              {character.episode && character.episode.length > 0 ? (
                <div className="space-y-4">
                  {character.episode.map((ep: any) => (
                    <div
                      key={ep.id}
                      className="border-b last:border-0 border-gray-300 dark:border-neutral-500 pb-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⇾</span>
                        <span className="font-semibold">
                          {ep.episode} - {ep.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {ep.air_date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No episodes found where this character has featured.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 