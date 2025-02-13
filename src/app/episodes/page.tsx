"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import fetchGraphQL from "@/lib/graphql/client";
import { GET_EPISODES_WITH_INFO } from "@/lib/graphql/queries";
import { User } from "lucide-react";

function getSeason(episodeCode: string): number {
  const match = episodeCode.match(/S(\d{2})E/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function Episodes() {
  // Holds all deduplicated episodes fetched so far.
  const [episodes, setEpisodes] = useState<any[]>([]);
  // API pagination
  const [page, setPage] = useState(1);
  // total pages
  const [totalPages, setTotalPages] = useState<number | null>(null);
  // fetch is in progress.
  const [loading, setLoading] = useState(false);
  // controls how many season groups are visible (when search is not active).
  const [visibleSeasonCount, setVisibleSeasonCount] = useState(1);
  // Search term state.
  const [searchTerm, setSearchTerm] = useState("");
  // active season state (for UI highlight)
  const [activeSeason, setActiveSeason] = useState<number | null>(null);

  const seasonRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  const scrollToSeason = (season: number) => {
    const element = seasonRefs.current[season];
    if (element) {
      const headerOffset = 0; 
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Fetch episodes from the API.
  const loadEpisodes = useCallback(async () => {
    if (loading || (totalPages !== null && page > totalPages)) return;
    setLoading(true);
    try {
      const data = await fetchGraphQL(GET_EPISODES_WITH_INFO, { page });
      const newEpisodes = data.episodes.results;
      setTotalPages(data.episodes.info.pages);

      // Deduplicate episodes based on their ID.
      setEpisodes((prevEpisodes) => {
        const existingIds = new Set(prevEpisodes.map((ep) => ep.id));
        const filteredNewEpisodes = newEpisodes.filter(
          (ep: any) => !existingIds.has(ep.id)
        );
        return [...prevEpisodes, ...filteredNewEpisodes];
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
    setLoading(false);
  }, [loading, page, totalPages]);

  // Initially load the first page.
  useEffect(() => {
    loadEpisodes();
  }, [loadEpisodes]);

  // Group episodes by season and sort them in ascending order.
  const sortedSeasons = useMemo(() => {
    const seasonMap: Record<number, any[]> = episodes.reduce((acc, episode) => {
      const season = getSeason(episode.episode);
      if (!acc[season]) {
        acc[season] = [];
      }
      acc[season].push(episode);
      return acc;
    }, {} as Record<number, any[]>);

    const seasonNumbers = Object.keys(seasonMap)
      .map(Number)
      .sort((a, b) => a - b);

    return seasonNumbers.map((season) => ({
      season,
      episodes: seasonMap[season],
    }));
  }, [episodes]);

  // Filtered seasons based on search term.
  const filteredSeasons = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase();
    return sortedSeasons
      .map((seasonGroup) => {
        const filteredEpisodes = seasonGroup.episodes.filter((episode) => {
          return (
            episode.name.toLowerCase().includes(query) ||
            episode.episode.toLowerCase().includes(query) ||
            episode.air_date.toLowerCase().includes(query)
          );
        });
        return {
          ...seasonGroup,
          episodes: filteredEpisodes,
        };
      })
      .filter((seasonGroup) => seasonGroup.episodes.length > 0);
  }, [sortedSeasons, searchTerm]);

  const displayedSeasons = searchTerm.trim()
    ? filteredSeasons
    : sortedSeasons.slice(0, visibleSeasonCount);

  const navSeasons = useMemo(() => {
    return searchTerm.trim() ? filteredSeasons : sortedSeasons;
  }, [sortedSeasons, filteredSeasons, searchTerm]);

  const handleSeasonClick = (season: number) => {
    if (!searchTerm.trim()) {
      const index = sortedSeasons.findIndex((s) => s.season === season);
      if (index >= 0 && index + 1 > visibleSeasonCount) {
        setVisibleSeasonCount(index + 1);
        // Allow time for the new season header to render before scrolling.
        setTimeout(() => {
          scrollToSeason(season);
        }, 200);
      } else {
        scrollToSeason(season);
      }
    } else {
      scrollToSeason(season);
    }
    setActiveSeason(season);
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVisibleSeasonRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!searchTerm.trim() && visibleSeasonCount < sortedSeasons.length) {
            setVisibleSeasonCount((prev) => prev + 1);
          }
          else if (totalPages === null || page <= totalPages) {
            loadEpisodes();
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      loading,
      sortedSeasons,
      visibleSeasonCount,
      totalPages,
      page,
      loadEpisodes,
      searchTerm,
    ]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-7xl mx-auto py-4">
          <Breadcrumbs />
        </nav>
        <h1 className="text-4xl font-bold mb-6">Episodes</h1>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-2 overflow-x-auto mb-4 md:mb-0">
            {navSeasons.map(({ season }) => (
              <button
                key={`nav-season-${season}`}
                onClick={() => handleSeasonClick(season)}
                className={`flex-shrink-0 px-4 py-2 rounded transition 
                  ${
                    activeSeason === season
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-blue-400 hover:text-white`}
              >
                Season {season}
              </button>
            ))}
          </div>
          {/* searchbar */}
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Render Episode Sections */}
        {displayedSeasons.length > 0 ? (
          displayedSeasons.map(({ season, episodes }) => (
            <section key={`season-${season}`} className="mb-12">
              <h2
                ref={(el) => { seasonRefs.current[season] = el; }}
                className="scroll-mt-0 text-3xl font-semibold mb-6"
              >
                Season {season}
              </h2>
              <div className="flex flex-col space-y-6">
                {episodes.map((episode: any) => (
                  <div
                    key={episode.id}
                    className="flex flex-col md:flex-row items-start md:items-center bg-white dark:bg-background p-6 rounded-lg shadow transition hover:shadow-lg"
                  >
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{episode.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Episode:</span>{" "}
                        {episode.episode}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Air Date:</span>{" "}
                        {episode.air_date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">ID:</span> {episode.id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(episode.created).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      {(() => {
                        const characters = episode.characters || [];
                        const visibleCharacters = characters.slice(0, 5);
                        const extraCount =
                          characters.length - visibleCharacters.length;
                        return (
                          <>
                            {visibleCharacters.map((character: any) => (
                              <div
                                key={character.id}
                                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
                                title={character.name}
                              >
                                {character.image ? (
                                  <img
                                    src={character.image}
                                    alt={character.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                )}
                              </div>
                            ))}
                            {extraCount > 0 && (
                              <div
                                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
                                title={`${extraCount} more characters`}
                              >
                                <span className="text-sm font-medium">
                                  +{extraCount}
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-gray-500">No episodes found.</p>
        )}
        <div ref={lastVisibleSeasonRef} className="h-10" />
        {loading && (
          <div className="flex justify-center my-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </main>
    </div>
  );
} 