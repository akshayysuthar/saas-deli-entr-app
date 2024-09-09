// pages/index.js

import Client from "@/components/Name";
import EntryForm from "../components/EntryForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <Client />
      <main className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Visitor and Delivery Person Entries
        </h1>
        <EntryForm />
      </main>

      <footer className="mt-8 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Society Management</p>
      </footer>
    </div>
  );
}
