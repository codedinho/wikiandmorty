import React from "react";

type Episode = {
  rank: number;
  title: string;
  episodeInfo: string;
  excerpt: string;
};

const topEpisodes: Episode[] = [
  {
    rank: 1,
    title: "Total Rickall",
    episodeInfo: "(S2E4)",
    excerpt: "A bizarre invasion where memories are questioned.",
  },
  {
    rank: 2,
    title: "Auto Erotic Assimilation",
    episodeInfo: "(S2E3)",
    excerpt: "Rick encounters a sentient assimilation that challenges him.",
  },
  {
    rank: 3,
    title: "Rixty Minutes",
    episodeInfo: "(S1E8)",
    excerpt: "An interdimensional cable sparks surreal moments.",
  },
  {
    rank: 4,
    title: "Mortynight Run",
    episodeInfo: "(S2E2)",
    excerpt: "A rollercoaster of action blended with dark humor.",
  },
  {
    rank: 5,
    title: "The Wedding Squanchers",
    episodeInfo: "(S2E10)",
    excerpt: "A celebration that descends into chaos with heartfelt twists.",
  },
];

export default function TopEpisodes() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg">
        <h2 className="text-4xl font-bold font-header mb-1 text-left">
          Top Rated Episodes
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 text-left font-light">
          Check out the best episodes from the series.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topEpisodes.map((episode) => (
            <div
              key={episode.rank}
              className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow cursor-pointer transition-transform transform hover:scale-105"
            >
              <span className="absolute top-2 left-2 text-5xl text-mainColor font-bold">
                #{episode.rank}
              </span>
              <div className="mt-10">
                <h3 className="text-lg font-header font-bold text-left">
                  {episode.title} {episode.episodeInfo}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 text-left">
                  {episode.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 