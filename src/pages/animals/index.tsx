import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import { useState } from 'react';
import Navigation from "../../components/Navigation";
import Pagination from "../../components/Pagination";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const animals = data.animals;
  const totalPages = Math.ceil(animals.length / itemsPerPage);

  const currentAnimals = animals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Animals</h1>
      <ul>
        {currentAnimals.map((animal: any) => (
          <li key={animal.id}>
            <Link href={`/animals/${animal.id}`}>
              {animal.name} ({animal.species})
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AnimalsPage;