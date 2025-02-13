"use client";

import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="container mx-auto my-8 p-6 bg-white dark:bg-neutral-800 rounded shadow flex flex-col md:flex-row items-center">
      {/* Image Section */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto">
        <Image
          src="/imgs/about-image.jpg" // update this path with your actual image
          alt="About Rick and Morty Wiki"
          fill
          className="object-cover rounded"
          quality={100}
        />
      </div>

      {/* Text Section */}
      <div className="mt-4 md:mt-0 md:pl-6 w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-2">About</h2>
        <p className="text-gray-700 dark:text-gray-300">
          The Rick and Morty Wiki is an unofficial collaborative database for the hit{" "}
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
          block on December 2, 2013.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          This wiki was founded on December 9, 2013 and currently has 2,772 articles! The wiki format
          allows anyone to create or edit any article, and we welcome any contributors.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          Further questions? Contact one of our administrators listed here.
        </p>
      </div>
    </div>
  );
} 