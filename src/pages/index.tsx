import Navigation from "../components/Navigation";
import { useTheme } from "../components/ThemeContext";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import PawPrint from "../pawPrint.svg";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4">
            Welcome to Our
            <span className="text-orange-600 dark:text-orange-400">
              {" "}
              Animal Management System
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Efficiently manage and track information about animals and their
            owners.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Link href="/persons" className="group">
            <div
              className={`p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-orange-500 text-white mb-4">
                <UserGroupIcon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                Persons
              </h2>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                View and manage information about pet owners.
              </p>
            </div>
          </Link>

          <Link href="/animals" className="group">
            <div
              className={`p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-white mb-4">
                <PawPrint className="w-10 h-20" fill="currentColor" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400">
                Animals
              </h2>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Browse and manage details about pets and animals.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
