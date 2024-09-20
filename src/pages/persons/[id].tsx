import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from 'next/link';
import Navigation from "../../components/Navigation";

const GET_PERSON = gql`
  query GetPerson($id: Int!) {
    person(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        species
      }
    }
  }
`;

const PersonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id: parseInt(id as string) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const person = data.person;

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Person Details</h1>
      <p>Name: {person.firstName} {person.lastName}</p>
      <p>Email address: {person.email}</p>
      <p>Phone number: {person.phoneNumber}</p>
      
      <h2 className="text-xl font-bold mt-6 mb-2">Owned Animals</h2>
      {person.animals.length > 0 ? (
        <ul>
          {person.animals.map((animal) => (
            <li key={animal.id}>
              <Link href={`/animals/${animal.id}`}>
                <span className="text-blue-500 hover:underline cursor-pointer">
                  {animal.name} ({animal.species})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>This person doesn't own any animals.</p>
      )}
    </div>
  );
};

export default PersonDetailPage;