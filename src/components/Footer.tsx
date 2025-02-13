export default function Footer() {
  return (
    <footer className="bg-mainColor dark:bg-background py-4 text-center">
      <p className="text-white dark:text-gray-200 text-sm">
        © {new Date().getFullYear()} Rick and Morty Fans. All rights reserved.
      </p>
    </footer>
  );
} 