export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-800 py-4 text-center">
      <p className="text-gray-700 dark:text-gray-200 text-sm">
        © {new Date().getFullYear()} Rick and Morty Fans. All rights reserved.
      </p>
    </footer>
  );
} 