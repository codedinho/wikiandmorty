"use client";

import React, { useState, useMemo } from "react";

type OriginListProps = {
  origins: string[];
};

export default function OriginList({ origins }: OriginListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrigins = useMemo(() => {
    return origins.filter((origin) =>
      origin.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [origins, searchQuery]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search origins"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300"
        />
      </div>

      {/* Filtered Origins Grid */}
      {filteredOrigins.length === 0 ? (
        <p>No origins found matching "{searchQuery}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrigins.map((origin, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow text-center"
            >
              <h2 className="text-xl font-semibold">{origin}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 