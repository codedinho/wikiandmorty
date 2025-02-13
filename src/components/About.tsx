"use client";

import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="max-w-7xl mt-14 mx-auto my-8 bg-white dark:bg-background rounded px-4 overflow-hidden grid grid-cols-1 md:grid-cols-2">
      {/* Image Section: No padding/margin so it fills the container */}
      <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
        <Image
            src="/imgs/rick-and-morty-about.webp"
            alt="About Rick and Morty Wiki"
            fill
            className="object-cover"
            quality={100}
        />
        </div>

      
      {/* Text Section with padding */}
      <div className="p-6 flex flex-col justify-center">
          <h2 className="text-4xl font-bold font-header mb-1 text-left mb-4">
            About Rick & Morty
          </h2>          
          <p className="text-gray-700 dark:text-gray-300">
          Wiki and Morty is an unofficial collaborative database for the hit{" "}
          <a
            href="https://adultswim.com/"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            adult swim
          </a>{" "}
          series Rick and Morty, a science-fiction, black comedy series about genius inventor, Rick Sanchez, and his naive grandson, Morty Smith. The American animated television show is created by Justin Roiland and Dan Harmon. It premiered on Cartoon Network&apos;s{" "}
          <a
            href="https://adultswim.com/"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            adult swim
          </a>{" "}
          block on December 2nd, 2013.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          This wiki was founded on February 13th, 2025!
        </p>
      </div>
    </div>
  );
} 