import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from "../../components/Navigation";
import { format, parseISO } from 'date-fns';

const GET_ANIMAL = gql`
  query GetAnimal($id: Int!) {
    animal(id: $id) {
      id
      name
      species
      dateOfBirth
      breed
      color
      weight
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

const AnimalDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_ANIMAL, {
    variables: { id: parseInt(id as string) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const animal = data.animal;

  // Format the date of birth
  const formattedDateOfBirth = animal.dateOfBirth 
    ? format(parseISO(animal.dateOfBirth), 'yyyy-MM-dd')
    : 'Unknown';

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Animal Details</h1>
      <p>Name: {animal.name}</p>
      <p>Date of Birth: {formattedDateOfBirth}</p>
      <p>Species: {animal.species}</p>
      <p>Breed: {animal.breed}</p>
      <p>Color: {animal.color}</p>
      <p>Weight: {animal.weight}</p>
      <p>Owner: 
        <Link href={`/persons/${animal.owner.id}`}>
          <span className="text-blue-500 hover:underline cursor-pointer">
            {animal.owner.firstName} {animal.owner.lastName}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default AnimalDetailPage;