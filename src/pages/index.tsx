import Navigation from "../components/navigation";

export default function Home() {
  return (
    <div>
      <Navigation />
      <h1 className="text-2xl font-bold mb-4">Welcome to Our Animal Management System</h1>
      <p>Use the navigation to view persons and animals.</p>
    </div>
  )
}