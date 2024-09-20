import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from 'next/link';
import Navigation from "../../components/Navigation";
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import PawPrint from "../../pawPrint.svg";

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

  const person = data.person;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Person Details</h1>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <UserIcon className="h-8 w-8 text-orange-500 dark:text-orange-400 mr-3" />
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{person.firstName} {person.lastName}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem icon={<EnvelopeIcon className="h-5 w-5" />} label="Email" value={person.email} />
            <DetailItem icon={<PhoneIcon className="h-5 w-5" />} label="Phone" value={person.phoneNumber} />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2">Owned Animals</h2>
          {person.animals.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {person.animals.map((animal) => (
                <li key={animal.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <Link href={`/animals/${animal.id}`}>
                    <div className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 cursor-pointer">
                      <PawPrint className="h-5 w-5" />
                      <span className="font-medium">{animal.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({animal.species})</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300">This person doesn't own any animals.</p>
          )}
        </div>

        {/* Return to List Button */}
        <div className="mt-6 flex justify-center sm:justify-start">
          <Link href="/persons">
            <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 ease-in-out">
              Return to the List
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-sm">
    <div className="text-gray-500 dark:text-gray-400">{icon}</div>
    <span className="text-gray-700 dark:text-gray-300">{label}:</span>
    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
  </div>
);

export default PersonDetailPage;