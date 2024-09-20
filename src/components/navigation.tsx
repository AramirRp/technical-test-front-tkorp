import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="text-white hover:text-gray-300">Home</Link></li>
        <li><Link href="/persons" className="text-white hover:text-gray-300">Persons</Link></li>
        <li><Link href="/animals" className="text-white hover:text-gray-300">Animals</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;