"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
  origin: {
    name: string;
  };
};

type CharacterListProps = {
  characters: Character[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [characters, searchQuery]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search characters by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300"
        />
      </div>

      {filteredCharacters.length === 0 ? (
        <p>No characters found matching "{searchQuery}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow text-center"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-24 h-24 object-cover mx-auto rounded-full"
              />
              <h2 className="text-xl font-semibold">{character.name}</h2>
              <p className="text-sm">{character.species}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/characters" className="text-accent hover:underline">
          ← Back to All Characters
        </Link>
      </div>
    </div>
  );
} 