"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import fetchGraphQL from "@/lib/graphql/client";
import { GET_CHARACTERS_WITH_INFO } from "@/lib/graphql/queries";
import CharacterList from "@/components/CharacterList";
import Breadcrumbs from "@/components/Breadcrumbs";

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

export default function InfiniteCharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Infinity);
  const [loading, setLoading] = useState<boolean>(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || currentPage > totalPages) return;

    setLoading(true);
    try {
      const data = await fetchGraphQL(GET_CHARACTERS_WITH_INFO, { page: currentPage });
      
      if (data?.characters?.info) {
        setTotalPages(data.characters.info.pages);
      }
      
      setCharacters((prev) => [...prev, ...data.characters.results]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading characters:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, totalPages, loading]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Set up the Intersection Observer to load more characters when scrolling near the bottom.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" } // Trigger a bit early before fully reaching the bottom.
    );
    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto py-8">
        <nav className="max-w-7xl mx-auto py-4">
          <Breadcrumbs />
        </nav>
        <h1 className="text-3xl font-bold mb-6">Characters</h1>
        <CharacterList characters={characters} />
        <div ref={loaderRef} />
        {loading && <p className="text-center mt-4">Loading more characters...</p>}
        {!loading && currentPage > totalPages && (
          <p className="text-center mt-4">No more characters to load.</p>
        )}
      </main>
    </div>
  );
} 