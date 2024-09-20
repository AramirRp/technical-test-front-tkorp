import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import Navigation from "../../components/Navigation";
import Pagination from "../../components/Pagination";
import PawPrint from "../../pawPrint.svg";

const GET_ANIMALS = gql`
  query {
    animals {
      id
      name
      species
    }
  }
`;

const AnimalsPage = () => {
  const { loading, error, data } = useQuery(GET_ANIMALS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error: {error.message}</p>
      </div>
    );

  const animals = data.animals;
  const totalPages = Math.ceil(animals.length / itemsPerPage);

  const currentAnimals = animals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Animals
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentAnimals.map((animal: any) => (
            <Link
              key={animal.id}
              href={`/animals/${animal.id}`}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition duration-200 ease-in-out group"
            >
              <PawPrint 
                className="h-10 w-10 text-orange-500 group-hover:text-white transition-colors duration-200"
                aria-hidden="true"
              />
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors duration-200">
                  {animal.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-200">
                  {animal.species}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalsPage;