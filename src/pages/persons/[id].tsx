import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Navigation from "../../components/navigation";

const GET_PERSON = gql`
  query GetPerson($id: Int!) {
    person(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
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
      <p>
        Name: {person.firstName} {person.lastName}
      </p>
      <p>Email adress : {person.email}</p>
      <p>Phone number : {person.phoneNumber}</p>
    </div>
  );
};

export default PersonDetailPage;
