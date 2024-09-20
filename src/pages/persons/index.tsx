import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import { useState } from 'react';
import Navigation from "../../components/Navigation";
import Pagination from "../../components/Pagination";
import { UserIcon } from '@heroicons/react/24/outline';

const GET_PERSONS = gql`
  query {
    persons {
      id
      firstName
      lastName
    }
  }
`;

const PersonsPage = () => {
  const { loading, error, data } = useQuery(GET_PERSONS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-500 mt-10">
      <p>Error: {error.message}</p>
    </div>
  );

  const persons = data.persons;
  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const currentPersons = persons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Persons</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentPersons.map((person: any) => (
            <Link 
              key={person.id} 
              href={`/persons/${person.id}`} 
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition duration-200 ease-in-out group"
            >
              <UserIcon className="h-10 w-10 text-orange-500 group-hover:text-white transition-colors duration-200" aria-hidden="true" />
              <div className="ml-4">
                <p className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors duration-200">
                  {person.firstName} {person.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white transition-colors duration-200">
                  ID: {person.id}
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

export default PersonsPage;