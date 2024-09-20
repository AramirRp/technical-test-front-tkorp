import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router';
import Navigation from "../../components/Navigation";

const GET_ANIMAL = gql`
  query GetAnimal($id: Int!) {
    animal(id: $id) {
      id
      name
      species
      # Add other fields as needed
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

  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Animal Details</h1>
      <p>Name: {animal.name}</p>
      <p>Species: {animal.species}</p>
    </div>
  );
};

export default AnimalDetailPage;