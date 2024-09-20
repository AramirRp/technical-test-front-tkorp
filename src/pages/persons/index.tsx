import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import Navigation from "../../components/navigation";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Persons</h1>
      <ul>
        {data.persons.map((person: any) => (
          <li key={person.id}>
            <Link href={`/persons/${person.id}`}>
              {person.firstName} {person.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonsPage;