import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import { format, parseISO } from "date-fns";
import PawPrint from "../../pawPrint.svg";
import { CalendarIcon, UserIcon, ScaleIcon } from '@heroicons/react/24/outline';

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error: {error.message}</p>
      </div>
    );

  const animal = data.animal;

  const formattedDateOfBirth = animal.dateOfBirth
    ? format(parseISO(animal.dateOfBirth), "MMMM d, yyyy")
    : "Unknown";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navigation />
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Animal Details
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <PawPrint className="h-8 w-8 text-orange-500 dark:text-orange-400 mr-3" />
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{animal.name}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem icon={<CalendarIcon className="h-5 w-5" />} label="Born" value={formattedDateOfBirth} />
            <DetailItem icon={<ScaleIcon className="h-5 w-5" />} label="Weight" value={animal.weight} />
            <DetailItem icon={<PawPrint className="h-5 w-5" />} label="Species" value={animal.species} />
            <DetailItem icon={<PawPrint className="h-5 w-5" />} label="Breed" value={animal.breed} />
            <DetailItem 
              icon={<div className="h-5 w-5 rounded-full" style={{ backgroundColor: animal.color }}></div>}
              label="Color"
              value={animal.color}
            />
            <DetailItem 
              icon={<UserIcon className="h-5 w-5" />}
              label="Owner"
              value={
                <Link href={`/persons/${animal.owner.id}`}>
                  <span className="text-orange-600 hover:underline cursor-pointer">
                    {animal.owner.firstName} {animal.owner.lastName}
                  </span>
                </Link>
              }
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-center sm:justify-start">
          <Link href="/animals">
            <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 ease-in-out">
              Return to Animals List
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

export default AnimalDetailPage;