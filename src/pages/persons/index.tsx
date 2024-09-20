import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import { useState } from 'react';
import Navigation from "../../components/Navigation";
import Pagination from "../../components/Pagination";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const persons = data.persons;
  const totalPages = Math.ceil(persons.length / itemsPerPage);

  const currentPersons = persons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Persons</h1>
      <ul>
        {currentPersons.map((person: any) => (
          <li key={person.id}>
            <Link href={`/persons/${person.id}`}>
              {person.firstName} {person.lastName}
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

export default PersonsPage;