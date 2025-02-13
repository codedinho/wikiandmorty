"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Navigate to the characters page with the search query as a param
      router.push(`/characters?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search characters by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 rounded border border-gray-300"
      />
    </div>
  );
} 