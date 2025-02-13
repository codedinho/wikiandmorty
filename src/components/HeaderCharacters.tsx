"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTERS_WITH_INFO } from "@/lib/graphql/queries";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Character = {
  id: string;
  name: string;
  image: string;
};

export default function HeaderCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      try {
        const data = await fetchGraphQL(GET_CHARACTERS_WITH_INFO);
        // Adjust according to your GraphQL return shape.
        const fetchedCharacters = data?.characters?.results || [];
        setCharacters(fetchedCharacters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, []);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  if (loading) {
    return <p className="p-2 text-center">Loading characters...</p>;
  }

  return (
    <div className="relative">
      {/* Desktop: Chevron Buttons (hidden on mobile) */}
      <button
        onClick={handlePrev}
        aria-label="Scroll Left"
        className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-600 dark:text-gray-300 rounded-full p-1 shadow"
      >
        <ChevronLeft size={25} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Scroll Right"
        className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-600 dark:text-gray-300 rounded-full p-1 shadow"
      >
        <ChevronRight size={25} />
      </button>

      {/* Scrollable container with clickable character items */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 overflow-x-auto hide-scrollbar py-2 pl-4 pr-4 md:pl-12 md:pr-12 focus:outline-none"
      >
        {characters.map((character) => (
          <Link key={character.id} href={`/characters/${character.id}`}>
            <div className="flex items-center flex-shrink-0 w-40 cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src={character.image}
                alt={character.name}
                className="w-12 h-12 rounded-full border border-gray-300 dark:border-neutral-500"
              />
              <span className="text-xs truncate ml-2" title={character.name}>
                {character.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 