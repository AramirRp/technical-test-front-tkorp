import { useQuery, gql } from "@apollo/client";
import Link from 'next/link';
import Navigation from "../../components/navigation";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Animals</h1>
      <ul>
        {data.animals.map((animal: any) => (
          <li key={animal.id}>
            <Link href={`/animals/${animal.id}`}>
              {animal.name} ({animal.species})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalsPage;