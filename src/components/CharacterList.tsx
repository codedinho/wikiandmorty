"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Mars,
  Venus,
  MapPin,
} from "lucide-react";

type Character = {
  id: string;
  name: string;
  image: string;
  species: string;
  type?: string;
  status?: string;
  gender?: string;
  origin: {
    name: string;
  };
};

type CharacterListProps = {
  characters: Character[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // New filter state
  const [statusFilter, setStatusFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [speciesFilter, setSpeciesFilter] = useState("All");

  const uniqueLocations = useMemo(() => {
    const locationsSet = new Set<string>();
    characters.forEach((character) =>
      locationsSet.add(character.origin.name)
    );
    return Array.from(locationsSet);
  }, [characters]);

  const uniqueSpecies = useMemo(() => {
    const speciesSet = new Set<string>();
    characters.forEach((character) =>
      speciesSet.add(character.species)
    );
    return Array.from(speciesSet);
  }, [characters]);

  // Reset Filters function
  const resetFilters = () => {
    setStatusFilter("All");
    setGenderFilter("All");
    setLocationFilter("All");
    setSpeciesFilter("All");
    setSearchQuery("");
  };

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchesName = character.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        (character.status || "Alive").toLowerCase() ===
          statusFilter.toLowerCase();
      const matchesGender =
        genderFilter === "All" ||
        (character.gender || "Male").toLowerCase() ===
          genderFilter.toLowerCase();
      const matchesLocation =
        locationFilter === "All" ||
        character.origin.name.toLowerCase() ===
          locationFilter.toLowerCase();
      const matchesSpecies =
        speciesFilter === "All" ||
        character.species.toLowerCase() ===
          speciesFilter.toLowerCase();

      return (
        matchesName &&
        matchesStatus &&
        matchesGender &&
        matchesLocation &&
        matchesSpecies
      );
    });
  }, [
    characters,
    searchQuery,
    statusFilter,
    genderFilter,
    locationFilter,
    speciesFilter,
  ]);

  return (
    <div className="w-full bg-white dark:bg-background rounded-lg">
      {/* Full-Width Filters Above Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 w-full">
        <div className="flex flex-wrap gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded bg-white dark:bg-white text-mainColor dark:text-black"
          >
            <option value="All">Status: All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-2 border rounded bg-white dark:bg-white text-mainColor dark:text-black"
          >
            <option value="All">Gender: All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border rounded bg-white dark:bg-white text-mainColor dark:text-black"
          >
            <option value="All">Location: All</option>
            {uniqueLocations.sort().map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="px-3 py-2 border rounded bg-white dark:bg-white text-mainColor dark:text-black"
          >
            <option value="All">Species: All</option>
            {uniqueSpecies.sort().map((specie) => (
              <option key={specie} value={specie}>
                {specie}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="px-3 py-2 border rounded text-sm hover:bg-gray-50 dark:hover:bg-neutral-600"
        >
          Reset Filters
        </button>
      </div>

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
            <Link key={character.id} href={`/characters/${character.id}`}>
              <div className="cursor-pointer bg-white dark:bg-background rounded-lg shadow overflow-hidden hover:shadow-lg transition-all">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  {/* Group 1: Name, Species, Type */}
                  <div className="space-y-1 pb-2 border-b border-gray-300 dark:border-neutral-500">
                    <h1>
                      <span className="font-bold text-xl">{character.name}</span>
                    </h1>
                    <p>
                      <span>{character.species}</span>
                    </p>
                  </div>
                  {/* Group 2: Status, Gender, Origin */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      {(character.status || "Alive") === "Alive" ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <XCircle size={16} className="text-red-500" />
                      )}
                      <span className="font-medium">
                        {character.status || "Alive"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
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
                      <span>{character.origin.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
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